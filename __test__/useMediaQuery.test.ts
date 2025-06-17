import { renderHook, act } from '@testing-library/react'
import { useMediaQuery, useBreakpoints } from '../hooks/useMediaQuery'
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('useMediaQuery', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('debe devolver true si la media query coincide', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 768px)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('debe devolver false si la media query no coincide', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
  })
})

describe('useBreakpoints', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('detecta mobile correctamente', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 767px)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    const { result } = renderHook(() => useBreakpoints())
    expect(result.current.isMobile).toBe(true)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.isDesktop).toBe(false)
    expect(result.current.isLargeDesktop).toBe(false)
  })

  it('detecta tablet correctamente', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 768px) and (max-width: 1023px)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    const { result } = renderHook(() => useBreakpoints())
    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(true)
    expect(result.current.isDesktop).toBe(false)
    expect(result.current.isLargeDesktop).toBe(false)
  })

  it('detecta desktop correctamente', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 1024px)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    const { result } = renderHook(() => useBreakpoints())
    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.isDesktop).toBe(true)
    expect(result.current.isLargeDesktop).toBe(false)
  })

  it('detecta large desktop correctamente', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 1280px)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    const { result } = renderHook(() => useBreakpoints())
    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.isDesktop).toBe(false)
    expect(result.current.isLargeDesktop).toBe(true)
  })
})
