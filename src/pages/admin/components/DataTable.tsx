import React, { useState, useMemo } from 'react'
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import type { ThemeMode } from '../types'

export interface Column<T> {
  key: string
  header: string
  render?: (item: T, index: number) => React.ReactNode
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface FilterOption {
  key: string
  label: string
  options: { label: string; value: string }[]
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  theme?: ThemeMode
  searchPlaceholder?: string
  searchKeys?: (keyof T)[]
  filters?: FilterOption[]
  isLoading?: boolean
  emptyTitle?: string
  emptyMessage?: string
  onRowClick?: (item: T) => void
  pageSizeOptions?: number[]
  defaultPageSize?: number
  actions?: React.ReactNode
  headerTitle?: string
  headerDescription?: string
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  theme = 'dark',
  searchPlaceholder = 'Search records...',
  searchKeys = [],
  filters = [],
  isLoading = false,
  emptyTitle = 'No records found',
  emptyMessage = 'There are no records matching your current criteria.',
  onRowClick,
  pageSizeOptions = [10, 25, 50, 100],
  defaultPageSize = 10,
  actions,
  headerTitle,
  headerDescription
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const isDark = theme === 'dark'

  // Handle sort toggle
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  // Handle filter change
  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters(prev => {
      if (!value || value === 'ALL') {
        const next = { ...prev }
        delete next[key]
        return next
      }
      return { ...prev, [key]: value }
    })
    setCurrentPage(1)
  }

  // Filter & Search data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = searchKeys.length > 0
          ? searchKeys.some(key => {
              const val = item[key]
              return val != null && String(val).toLowerCase().includes(query)
            })
          : Object.values(item).some(val => val != null && String(val).toLowerCase().includes(query))
        
        if (!matchesSearch) return false
      }

      // Dropdown filters check
      for (const [filterKey, filterVal] of Object.entries(activeFilters)) {
        if (item[filterKey] != null && String(item[filterKey]).toLowerCase() !== filterVal.toLowerCase()) {
          return false
        }
      }

      return true
    })
  }, [data, searchQuery, searchKeys, activeFilters])

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue == null) return 1
      if (bValue == null) return -1

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
      }

      const aStr = String(aValue).toLowerCase()
      const bStr = String(bValue).toLowerCase()
      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortConfig])

  // Paginate data
  const totalRecords = sortedData.length
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize))
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, currentPage, pageSize])

  // Ensure current page is valid when dataset changes
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endRecord = Math.min(currentPage * pageSize, totalRecords)

  return (
    <div style={{
      background: isDark ? 'rgba(11,21,43,0.35)' : '#FFFFFF',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,35,75,0.08)'}`,
      borderRadius: 16,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header Bar */}
      {(headerTitle || headerDescription || actions || searchKeys.length > 0 || filters.length > 0) && (
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,35,75,0.06)'}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {(headerTitle || actions) && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                {headerTitle && (
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#0B1B33', margin: 0 }}>
                    {headerTitle}
                  </h3>
                )}
                {headerDescription && (
                  <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: '0.2rem 0 0 0' }}>
                    {headerDescription}
                  </p>
                )}
              </div>
              {actions && <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>{actions}</div>}
            </div>
          )}

          {/* Search and Filters Controls */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            {searchKeys.length > 0 && (
              <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: 400 }}>
                <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.8rem 0.55rem 2.4rem',
                    borderRadius: 8,
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'}`,
                    background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC',
                    color: isDark ? '#FFFFFF' : '#0B1B33',
                    fontSize: '0.84rem',
                    outline: 'none'
                  }}
                />
              </div>
            )}

            {filters.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Filter size={15} color="#94A3B8" />
                {filters.map(filter => (
                  <select
                    key={filter.key}
                    value={activeFilters[filter.key] || 'ALL'}
                    onChange={e => handleFilterChange(filter.key, e.target.value)}
                    style={{
                      padding: '0.55rem 0.8rem',
                      borderRadius: 8,
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'}`,
                      background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC',
                      color: isDark ? '#FFFFFF' : '#0B1B33',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="ALL">{filter.label}: All</option>
                    {filter.options.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table Body */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
          <thead>
            <tr style={{
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)',
              color: '#94A3B8',
              fontWeight: 700
            }}>
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  style={{
                    padding: '0.85rem 1rem',
                    cursor: col.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    width: col.width,
                    textAlign: col.align || 'left'
                  }}
                >
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    justifyContent: col.align === 'right' ? 'flex-end' : col.align === 'center' ? 'center' : 'flex-start'
                  }}>
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span style={{ display: 'inline-flex', flexDirection: 'column' }}>
                        {sortConfig?.key === col.key ? (
                          sortConfig.direction === 'asc' ? <ChevronUp size={14} color={isDark ? '#FFF' : '#000'} /> : <ChevronDown size={14} color={isDark ? '#FFF' : '#000'} />
                        ) : (
                          <ChevronsUpDown size={13} color="#64748B" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: '3rem', textAlign: 'center', color: '#94A3B8' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <div className="loading-spinner" style={{ width: 24, height: 24, border: '2px solid rgba(59,130,246,0.3)', borderTopColor: '#3B82F6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    <span>Loading data...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: '3.5rem 1rem', textAlign: 'center' }}>
                  <div style={{ maxWidth: 360, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontWeight: 800 }}>
                      0
                    </div>
                    <div style={{ fontWeight: 700, color: isDark ? '#FFFFFF' : '#0B1B33', fontSize: '0.95rem' }}>{emptyTitle}</div>
                    <div style={{ color: '#94A3B8', fontSize: '0.8rem', lineHeight: 1.4 }}>{emptyMessage}</div>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr
                  key={item.id || index}
                  onClick={() => onRowClick && onRowClick(item)}
                  style={{
                    borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                    cursor: onRowClick ? 'pointer' : 'default',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={e => { if (onRowClick) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}
                  onMouseLeave={e => { if (onRowClick) e.currentTarget.style.background = 'transparent' }}
                >
                  {columns.map(col => (
                    <td
                      key={col.key}
                      style={{
                        padding: '0.9rem 1rem',
                        textAlign: col.align || 'left',
                        color: isDark ? '#E2E8F0' : '#1E293B'
                      }}
                    >
                      {col.render ? col.render(item, (currentPage - 1) * pageSize + index) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      {!isLoading && totalRecords > 0 && (
        <div style={{
          padding: '0.85rem 1.5rem',
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,35,75,0.06)'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          background: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.01)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#94A3B8', fontSize: '0.8rem' }}>
            <span>Showing <strong style={{ color: isDark ? '#FFF' : '#000' }}>{startRecord}</strong> to <strong style={{ color: isDark ? '#FFF' : '#000' }}>{endRecord}</strong> of <strong style={{ color: isDark ? '#FFF' : '#000' }}>{totalRecords}</strong> entries</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginLeft: '0.5rem' }}>
              <span>Rows:</span>
              <select
                value={pageSize}
                onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                style={{
                  padding: '0.2rem 0.4rem',
                  borderRadius: 6,
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.15)'}`,
                  background: isDark ? 'rgba(0,0,0,0.3)' : '#FFFFFF',
                  color: isDark ? '#FFFFFF' : '#0B1B33',
                  fontSize: '0.78rem',
                  outline: 'none'
                }}
              >
                {pageSizeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                padding: '0.4rem 0.6rem',
                borderRadius: 6,
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'}`,
                background: currentPage === 1 ? 'transparent' : (isDark ? 'rgba(255,255,255,0.05)' : '#FFF'),
                color: currentPage === 1 ? '#475569' : (isDark ? '#FFF' : '#000'),
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <span style={{ fontSize: '0.8rem', padding: '0 0.5rem', color: isDark ? '#E2E8F0' : '#1E293B', fontWeight: 600 }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              style={{
                padding: '0.4rem 0.6rem',
                borderRadius: 6,
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'}`,
                background: (currentPage === totalPages || totalPages === 0) ? 'transparent' : (isDark ? 'rgba(255,255,255,0.05)' : '#FFF'),
                color: (currentPage === totalPages || totalPages === 0) ? '#475569' : (isDark ? '#FFF' : '#000'),
                cursor: (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
