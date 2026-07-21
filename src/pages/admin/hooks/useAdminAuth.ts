import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, type User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth as firebaseAuth, db as firebaseDb, isFirebaseConfigured } from '../../../lib/firebase'

export function useAdminAuth() {
  const auth = firebaseAuth
  const db = firebaseDb
  const navigate = useNavigate()
  const isLive = Boolean(isFirebaseConfigured && auth && db)

  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  useEffect(() => {
    if (!isLive || !auth || !db) {
      setAuthLoading(false)
      setIsSuperAdmin(true) // Simulated admin in local/demo mode
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            const role = userData?.role ?? ''
            if (role === 'super_admin' || role === 'founder' || role === 'director' || role === 'store_owner') {
              setCurrentUser(user)
              setIsSuperAdmin(true)
              setLoginError('')
            } else {
              setLoginError('Access denied: You do not have administrator permissions.')
              await signOut(auth)
              setCurrentUser(null)
              setIsSuperAdmin(false)
            }
          } else {
            setLoginError('Access denied: Admin record not found in database.')
            await signOut(auth)
            setCurrentUser(null)
            setIsSuperAdmin(false)
          }
        } catch (error: any) {
          setLoginError('Authorization error: ' + error.message)
          setCurrentUser(null)
          setIsSuperAdmin(false)
        }
      } else {
        setCurrentUser(null)
        setIsSuperAdmin(false)
      }
      setAuthLoading(false)
    })

    return () => unsubscribe()
  }, [isLive, auth, db])

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLive || !auth) return
    setLoginError('')
    setIsLoggingIn(true)
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    } catch (error: any) {
      console.error('Login failed:', error)
      setLoginError(error.message || 'Invalid email or password.')
    } finally {
      setIsLoggingIn(false)
    }
  }, [isLive, auth, loginEmail, loginPassword])

  const handleGoogleLogin = useCallback(async () => {
    if (!isLive || !auth) return
    setLoginError('')
    setIsLoggingIn(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error: any) {
      console.error('Google sign-in failed:', error)
      setLoginError(error.message || 'Google authentication failed.')
    } finally {
      setIsLoggingIn(false)
    }
  }, [isLive, auth])

  const handleLogout = useCallback(async () => {
    if (isLive && auth) {
      await signOut(auth)
    }
    navigate('/')
  }, [isLive, auth, navigate])

  return {
    currentUser,
    authLoading,
    isSuperAdmin,
    isLive,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    loginError,
    setLoginError,
    isLoggingIn,
    handleLogin,
    handleGoogleLogin,
    handleLogout
  }
}
