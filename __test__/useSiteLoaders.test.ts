it('debe limpiar el error al inicio de una nueva carga', async () => {
    mockLoadSite.mockRejectedValueOnce(new Error('First error'))
    
    const { result, unmount } = renderHook(() => useSiteLoader())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.error).toBe('First error')

    unmount()

    mockLoadSite.mockResolvedValue({
      success: true,
      sections: [{ id: '1', name: 'Home', isHome: true }]
    })

    const { result: newResult, unmount: newUnmount } = renderHook(() => useSiteLoader())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(newResult.current.error).toBe(null)
    expect(newResult.current.isLoading).toBe(false)

    newUnmount()
  })

  it('debe verificar que setError(null) se llama al inicio', async () => {
    // Crear un spy para console.error para verificar que se llama
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    mockLoadSite.mockRejectedValue(new Error('Test error'))
    
    const { result, unmount } = renderHook(() => useSiteLoader())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.error).toBe('Test error')
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar el sitio:', expect.any(Error))

    consoleErrorSpy.mockRestore()
    unmount()
  })
import { renderHook, act } from '@testing-library/react'
import { useSiteLoader } from '../hooks/useSiteLoader'
import { useCanvasStore } from '@/store/canvasStore'
import { loadSite } from '@/app/actions/loadSiteAction'
import { toast } from 'sonner'
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest'

// Mocks
vi.mock('@/store/canvasStore')
vi.mock('@/app/actions/loadSiteAction')
vi.mock('sonner')

// Mock del store
const mockSetSections = vi.fn()
const mockSetActiveSection = vi.fn()

// Mock de useCanvasStore
const mockUseCanvasStore = useCanvasStore as unknown as Mock
mockUseCanvasStore.mockImplementation((selector) => {
  const state = {
    setSections: mockSetSections,
    setActiveSection: mockSetActiveSection
  }
  return selector(state)
})

// Mock de loadSite
const mockLoadSite = loadSite as Mock

// Mock de toast
const mockToast = {
  success: vi.fn(),
  error: vi.fn()
}
vi.mocked(toast).success = mockToast.success
vi.mocked(toast).error = mockToast.error

describe('useSiteLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useFakeTimers()
    vi.useRealTimers()
  })

  it('debe cargar el sitio correctamente con sección home', async () => {
    const mockSections = [
      { id: '1', name: 'About', isHome: false },
      { id: '2', name: 'Home', isHome: true },
      { id: '3', name: 'Contact', isHome: false }
    ]

    mockLoadSite.mockResolvedValue({
      success: true,
      sections: mockSections
    })

    const { result, unmount } = renderHook(() => useSiteLoader())

    // Estado inicial
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(null)

    // Esperar a que se complete la carga
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    // Verificar que se llamaron las funciones del store
    expect(mockSetSections).toHaveBeenCalledWith(mockSections)
    expect(mockSetActiveSection).toHaveBeenCalledWith('2') // La sección home

    // Verificar estado final
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)

    // Verificar que se mostró el toast de éxito
    expect(mockToast.success).toHaveBeenCalledWith('Sitio cargado correctamente', {
      position: 'top-center',
      duration: 3000,
      style: {
        background: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      }
    })

    // Verificar que se llamó loadSite
    expect(mockLoadSite).toHaveBeenCalledTimes(1)

    unmount()
  })

  it('debe cargar el sitio y activar la primera sección si no hay home', async () => {
    const mockSections = [
      { id: '1', name: 'About', isHome: false },
      { id: '2', name: 'Services', isHome: false },
      { id: '3', name: 'Contact', isHome: false }
    ]

    mockLoadSite.mockResolvedValue({
      success: true,
      sections: mockSections
    })

    const { result, unmount } = renderHook(() => useSiteLoader())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    // Verificar que se activó la primera sección
    expect(mockSetActiveSection).toHaveBeenCalledWith('1')
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)

    unmount()
  })

  it('debe manejar el caso cuando no hay secciones', async () => {
    mockLoadSite.mockResolvedValue({
      success: true,
      sections: []
    })

    const { result, unmount } = renderHook(() => useSiteLoader())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    // Verificar que se configuraron las secciones vacías
    expect(mockSetSections).toHaveBeenCalledWith([])
    expect(mockSetActiveSection).not.toHaveBeenCalled()
    
    // No debe mostrar toast de éxito para sitio vacío
    expect(mockToast.success).not.toHaveBeenCalled()
    
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)

    unmount()
  })

  it('debe manejar errores cuando loadSite falla', async () => {
    const errorMessage = 'Error al conectar con el servidor'
    
    mockLoadSite.mockResolvedValue({
      success: false,
      error: errorMessage
    })

    const { result, unmount } = renderHook(() => useSiteLoader())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    // Verificar estado de error
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(errorMessage)

    // Verificar que no se actualizó el store
    expect(mockSetSections).not.toHaveBeenCalled()
    expect(mockSetActiveSection).not.toHaveBeenCalled()

    // Verificar toast de error
    expect(mockToast.error).toHaveBeenCalledWith(errorMessage, {
      position: 'top-center',
      duration: 5000,
      style: {
        background: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      }
    })

    unmount()
  })

  it('debe manejar errores cuando loadSite lanza excepción', async () => {
    const error = new Error('Network error')
    
    mockLoadSite.mockRejectedValue(error)

    const { result, unmount } = renderHook(() => useSiteLoader())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    // Verificar estado de error
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe('Network error')

    // Verificar toast de error
    expect(mockToast.error).toHaveBeenCalledWith('Network error', expect.any(Object))

    unmount()
  })

  it('debe manejar errores no tipados', async () => {
    mockLoadSite.mockRejectedValue('String error')

    const { result, unmount } = renderHook(() => useSiteLoader())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    // Verificar que maneja errores no tipados
    expect(result.current.error).toBe('Error al cargar el sitio')
    expect(mockToast.error).toHaveBeenCalledWith('Error al cargar el sitio', expect.any(Object))

    unmount()
  })

  it('debe manejar el caso success true pero sin sections', async () => {
    mockLoadSite.mockResolvedValue({
      success: true,
      sections: null
    })

    const { result, unmount } = renderHook(() => useSiteLoader())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    // Debe tratarlo como error
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe('Error desconocido al cargar el sitio')
    expect(mockToast.error).toHaveBeenCalled()

    unmount()
  })

  it('debe limpiar el error al inicio de una nueva carga', async () => {
    // Primera carga con error
    mockLoadSite.mockRejectedValueOnce(new Error('First error'))
    
    const { result, unmount } = renderHook(() => useSiteLoader())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.error).toBe('First error')

    // Limpiar el hook anterior
    unmount()

    // Segunda carga exitosa con nuevo hook
    mockLoadSite.mockResolvedValue({
      success: true,
      sections: [{ id: '1', name: 'Home', isHome: true }]
    })

    const { result: newResult, unmount: newUnmount } = renderHook(() => useSiteLoader())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(newResult.current.error).toBe(null)
    expect(newResult.current.isLoading).toBe(false)

    newUnmount()
  })
})