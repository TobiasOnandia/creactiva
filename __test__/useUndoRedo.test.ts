import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Declara los mocks fuera del scope del factory
const mockUndo = vi.fn()
const mockRedo = vi.fn()
const mockCanUndo = vi.fn(() => true)
const mockCanRedo = vi.fn(() => true)
const mockIsPreviewMode = vi.fn(() => false)

vi.mock('@/store/canvasStore', () => ({
  useCanvasStore: vi.fn(() => ({
    undo: mockUndo,
    redo: mockRedo,
    isPreviewMode: mockIsPreviewMode()
  }))
}))

vi.mock('@/store/historyStore', () => ({
  useHistoryStore: vi.fn(() => ({
    canUndo: mockCanUndo(),
    canRedo: mockCanRedo()
  }))
}))

// Importa después de los mocks
import { useUndoRedo } from '../hooks/useUndoRedo'

describe('useUndoRedo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset default values
    mockCanUndo.mockReturnValue(true)
    mockCanRedo.mockReturnValue(true)
    mockIsPreviewMode.mockReturnValue(false)
    
    // Mock document.activeElement
    Object.defineProperty(document, 'activeElement', {
      writable: true,
      value: null
    })
  })

  afterEach(() => {
    // Limpia todos los event listeners
    vi.restoreAllMocks()
  })

  const createKeyboardEvent = (options: {
    key: string
    ctrlKey?: boolean
    metaKey?: boolean
    shiftKey?: boolean
  }) => {
    const event = new KeyboardEvent('keydown', {
      key: options.key,
      ctrlKey: options.ctrlKey || false,
      metaKey: options.metaKey || false,
      shiftKey: options.shiftKey || false,
      bubbles: true
    })
    
    // Mock preventDefault
    event.preventDefault = vi.fn()
    return event
  }

  it('debe registrar los event listeners correctamente', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    
    const { unmount } = renderHook(() => useUndoRedo())
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
  })

  it('debe ejecutar undo con Ctrl+Z cuando canUndo es true', () => {
    renderHook(() => useUndoRedo())
    
    const event = createKeyboardEvent({ key: 'z', ctrlKey: true })
    window.dispatchEvent(event)
    
    expect(event.preventDefault).toHaveBeenCalled()
    expect(mockUndo).toHaveBeenCalledTimes(1)
  })

  it('debe ejecutar undo con Cmd+Z cuando canUndo es true', () => {
    renderHook(() => useUndoRedo())
    
    const event = createKeyboardEvent({ key: 'z', metaKey: true })
    window.dispatchEvent(event)
    
    expect(event.preventDefault).toHaveBeenCalled()
    expect(mockUndo).toHaveBeenCalledTimes(1)
  })

  it('no debe ejecutar undo cuando canUndo es false', () => {
    mockCanUndo.mockReturnValue(false)
    renderHook(() => useUndoRedo())
    
    const event = createKeyboardEvent({ key: 'z', ctrlKey: true })
    window.dispatchEvent(event)
    
    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(mockUndo).not.toHaveBeenCalled()
  })

  it('debe ejecutar redo con Ctrl+Shift+Z cuando canRedo es true', () => {
    renderHook(() => useUndoRedo())
    
    const event = createKeyboardEvent({ key: 'z', ctrlKey: true, shiftKey: true })
    window.dispatchEvent(event)
    
    expect(event.preventDefault).toHaveBeenCalled()
    expect(mockRedo).toHaveBeenCalledTimes(1)
  })

  it('debe ejecutar redo con Ctrl+Y cuando canRedo es true', () => {
    renderHook(() => useUndoRedo())
    
    const event = createKeyboardEvent({ key: 'y', ctrlKey: true })
    window.dispatchEvent(event)
    
    expect(event.preventDefault).toHaveBeenCalled()
    expect(mockRedo).toHaveBeenCalledTimes(1)
  })

  it('debe ejecutar redo con Cmd+Y cuando canRedo es true', () => {
    renderHook(() => useUndoRedo())
    
    const event = createKeyboardEvent({ key: 'y', metaKey: true })
    window.dispatchEvent(event)
    
    expect(event.preventDefault).toHaveBeenCalled()
    expect(mockRedo).toHaveBeenCalledTimes(1)
  })

  it('no debe ejecutar redo cuando canRedo es false', () => {
    mockCanRedo.mockReturnValue(false)
    renderHook(() => useUndoRedo())
    
    const event = createKeyboardEvent({ key: 'y', ctrlKey: true })
    window.dispatchEvent(event)
    
    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(mockRedo).not.toHaveBeenCalled()
  })

  it('no debe ejecutar acciones en modo preview', () => {
    mockIsPreviewMode.mockReturnValue(true)
    renderHook(() => useUndoRedo())
    
    const undoEvent = createKeyboardEvent({ key: 'z', ctrlKey: true })
    const redoEvent = createKeyboardEvent({ key: 'y', ctrlKey: true })
    
    window.dispatchEvent(undoEvent)
    window.dispatchEvent(redoEvent)
    
    expect(undoEvent.preventDefault).not.toHaveBeenCalled()
    expect(redoEvent.preventDefault).not.toHaveBeenCalled()
    expect(mockUndo).not.toHaveBeenCalled()
    expect(mockRedo).not.toHaveBeenCalled()
  })

  it('no debe ejecutar acciones cuando el foco está en un INPUT', () => {
    const mockInput = document.createElement('input')
    Object.defineProperty(document, 'activeElement', {
      writable: true,
      value: mockInput
    })
    
    renderHook(() => useUndoRedo())
    
    const event = createKeyboardEvent({ key: 'z', ctrlKey: true })
    window.dispatchEvent(event)
    
    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(mockUndo).not.toHaveBeenCalled()
  })

  it('no debe ejecutar acciones cuando el foco está en un TEXTAREA', () => {
    const mockTextarea = document.createElement('textarea')
    Object.defineProperty(document, 'activeElement', {
      writable: true,
      value: mockTextarea
    })
    
    renderHook(() => useUndoRedo())
    
    const event = createKeyboardEvent({ key: 'z', ctrlKey: true })
    window.dispatchEvent(event)
    
    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(mockUndo).not.toHaveBeenCalled()
  })

  it('no debe ejecutar acciones cuando el elemento tiene contenteditable="true"', () => {
    const mockDiv = document.createElement('div')
    mockDiv.setAttribute('contenteditable', 'true')
    Object.defineProperty(document, 'activeElement', {
      writable: true,
      value: mockDiv
    })
    
    renderHook(() => useUndoRedo())
    
    const event = createKeyboardEvent({ key: 'z', ctrlKey: true })
    window.dispatchEvent(event)
    
    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(mockUndo).not.toHaveBeenCalled()
  })

  it('debe manejar teclas en mayúsculas correctamente', () => {
    renderHook(() => useUndoRedo())
    
    const event = createKeyboardEvent({ key: 'Z', ctrlKey: true })
    window.dispatchEvent(event)
    
    expect(event.preventDefault).toHaveBeenCalled()
    expect(mockUndo).toHaveBeenCalledTimes(1)
  })

  it('no debe ejecutar undo si se presiona Shift junto con Ctrl+Z (debe ser redo)', () => {
    renderHook(() => useUndoRedo())
    
    const event = createKeyboardEvent({ key: 'z', ctrlKey: true, shiftKey: true })
    window.dispatchEvent(event)
    
    expect(mockUndo).not.toHaveBeenCalled()
    expect(mockRedo).toHaveBeenCalledTimes(1)
  })

  it('debe limpiar los event listeners cuando el componente se desmonta', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    
    const { unmount } = renderHook(() => useUndoRedo())
    
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
  })
})