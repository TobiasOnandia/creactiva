import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../hooks/useAuth'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock de Supabase
const mockUnsubscribe = vi.fn()
const mockGetUser = vi.fn()
const mockOnAuthStateChange = vi.fn()

vi.mock('@/utils/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser,
      onAuthStateChange: mockOnAuthStateChange
    }
  })
}))

describe('useAuth', () => {
  beforeEach(() => {
    // Resetear todos los mocks antes de cada test
    vi.clearAllMocks()
    
    // Configuración por defecto del mock
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: mockUnsubscribe } }
    })
  })

  afterEach(() => {
    // Limpiar cualquier timer o efecto pendiente
    vi.useFakeTimers()
    vi.useRealTimers()
  })

  it('debe autenticar correctamente al usuario', async () => {
    // Configurar mock para usuario autenticado
    mockGetUser.mockResolvedValue({ 
      data: { user: { id: 'user-1', email: 'test@example.com' } },
      error: null
    })

    const { result, unmount } = renderHook(() => useAuth())

    // Esperar a que se resuelvan las promesas
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user).toEqual({ id: 'user-1', email: 'test@example.com' })
    expect(result.current.isLoading).toBe(false)

    // Limpiar el hook para evitar efectos pendientes
    unmount()
  })

  it('debe manejar el estado de no autenticado', async () => {
    // Configurar mock para usuario no autenticado
    mockGetUser.mockResolvedValue({ 
      data: { user: null },
      error: null
    })

    const { result, unmount } = renderHook(() => useAuth())

    // Esperar a que se resuelvan las promesas
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBe(null)
    expect(result.current.isLoading).toBe(false)

    // Limpiar el hook
    unmount()
  })

  it('debe manejar errores de autenticación', async () => {
    // Configurar mock para error
    mockGetUser.mockResolvedValue({ 
      data: { user: null },
      error: { message: 'Authentication failed' }
    })

    const { result, unmount } = renderHook(() => useAuth())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBe(null)
    expect(result.current.isLoading).toBe(false)

    unmount()
  })

  it('debe cancelar la suscripción al desmontar', () => {
    const { unmount } = renderHook(() => useAuth())
    
    // Verificar que se registró la suscripción
    expect(mockOnAuthStateChange).toHaveBeenCalled()
    
    // Desmontar el hook
    unmount()
    
    // Verificar que se llamó unsubscribe
    expect(mockUnsubscribe).toHaveBeenCalled()
  })
})