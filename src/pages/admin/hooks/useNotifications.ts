import { useState, useEffect, useCallback } from 'react'
import { collection, onSnapshot, query, orderBy, limit, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db as firebaseDb, isFirebaseConfigured } from '../../../lib/firebase'
import type { NotificationItem } from '../types'

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'system',
    title: 'System Backup Completed',
    message: 'Automated snapshot of Firestore collections and Storage buckets succeeded.',
    timestamp: 'Just now',
    read: false
  },
  {
    id: 'notif-2',
    category: 'crm',
    title: 'New Enterprise Proposal Signed',
    message: 'Nexus Hospitality signed proposal prop-1 for ₹18,50,000.',
    timestamp: '2h ago',
    read: false
  },
  {
    id: 'notif-3',
    category: 'support',
    title: 'Urgent Ticket Escalation',
    message: 'Ticket tkt-3 (Kada Stay API failure) escalated due to SLA timeout.',
    timestamp: '4h ago',
    read: true
  }
]

export function useNotifications() {
  const db = firebaseDb
  const isLive = isFirebaseConfigured && db !== null

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const stored = localStorage.getItem('tkdv_admin_notifications')
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse notifications from localStorage:', e)
    }
    return INITIAL_NOTIFICATIONS
  })

  // Subscribe to Firestore when live
  useEffect(() => {
    if (!isLive) {
      try {
        localStorage.setItem('tkdv_admin_notifications', JSON.stringify(notifications))
      } catch (e) {
        console.error('Failed to save notifications:', e)
      }
      return
    }

    const q = query(collection(db, 'admin_notifications'), orderBy('createdAt', 'desc'), limit(50))
    const unsubscribe = onSnapshot(q, (snap) => {
      const items: NotificationItem[] = snap.docs.map(d => {
        const data = d.data()
        let timestampStr = 'Just now'
        if (data.createdAt?.toDate) {
          timestampStr = data.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } else if (data.timestamp) {
          timestampStr = String(data.timestamp)
        }
        return {
          id: d.id,
          category: data.category || 'system',
          title: data.title || 'Notification',
          message: data.message || '',
          timestamp: timestampStr,
          read: Boolean(data.read)
        }
      })
      setNotifications(items)
    }, (err) => {
      console.error('Failed to listen to admin_notifications:', err)
    })

    return () => unsubscribe()
  }, [isLive, db])

  const markAsRead = useCallback(async (id: string) => {
    if (isLive) {
      try {
        await updateDoc(doc(db, 'admin_notifications', id), { read: true })
      } catch (e) {
        console.error('Failed to mark notification read in Firestore:', e)
      }
    } else {
      setNotifications(prev => {
        const next = prev.map(n => n.id === id ? { ...n, read: true } : n)
        localStorage.setItem('tkdv_admin_notifications', JSON.stringify(next))
        return next
      })
    }
  }, [isLive, db])

  const markAllAsRead = useCallback(async () => {
    if (isLive) {
      const unread = notifications.filter(n => !n.read)
      for (const n of unread) {
        try {
          await updateDoc(doc(db, 'admin_notifications', n.id), { read: true })
        } catch (e) {
          console.error('Failed to mark all read:', e)
        }
      }
    } else {
      setNotifications(prev => {
        const next = prev.map(n => ({ ...n, read: true }))
        localStorage.setItem('tkdv_admin_notifications', JSON.stringify(next))
        return next
      })
    }
  }, [isLive, db, notifications])

  const clearAll = useCallback(async () => {
    if (isLive) {
      for (const n of notifications) {
        try {
          await deleteDoc(doc(db, 'admin_notifications', n.id))
        } catch (e) {
          console.error('Failed to delete notification:', e)
        }
      }
    } else {
      setNotifications([])
      localStorage.removeItem('tkdv_admin_notifications')
    }
  }, [isLive, db, notifications])

  const addNotification = useCallback(async (notif: {
    category: 'system' | 'crm' | 'support' | 'hr' | 'security'
    title: string
    message: string
  }) => {
    if (isLive) {
      try {
        await addDoc(collection(db, 'admin_notifications'), {
          ...notif,
          read: false,
          createdAt: serverTimestamp()
        })
      } catch (e) {
        console.error('Failed to add notification to Firestore:', e)
      }
    } else {
      const newItem: NotificationItem = {
        id: `notif-${Date.now()}`,
        category: notif.category,
        title: notif.title,
        message: notif.message,
        timestamp: 'Just now',
        read: false
      }
      setNotifications(prev => {
        const next = [newItem, ...prev]
        localStorage.setItem('tkdv_admin_notifications', JSON.stringify(next))
        return next
      })
    }
  }, [isLive, db])

  return {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    markAsRead,
    markAllAsRead,
    clearAll,
    addNotification
  }
}
