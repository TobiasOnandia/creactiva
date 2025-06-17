import { renderHook, act } from '@testing-library/react'
import { useAddElementMobile } from '../hooks/useAddElementMobile'
import { describe, it, expect, beforeEach, vi } from 'vitest'

vi.mock('@/store/canvasStore', () => ({
  useCanvasStore: vi.fn((selector) => {
    // Simula el estado del store
    const state = {
      addElementToSection: vi.fn(),
      updateSectionLayout: vi.fn(),
      activeSectionId: 'section-1',
      sections: [
        { id: 'section-1', layout: [] }
      ]
    }
    return selector(state)
  })
}))

vi.mock('@/components/factories/elementFactory', () => ({
  ElementFactory: {
    createElement: vi.fn((type) => ({ id: 'element-1', type }))
  }
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

vi.mock('@/config', () => ({
  GRID_CONFIG: {
    cols: { lg: 12 },
    defaultSize: { w: 2, h: 2 },
    minSize: { w: 1, h: 1 }
  }
}))
vi.mock('@/config/elementConfig', () => ({
  ELEMENT_TYPE_CONFIG: {}
}))

describe('useAddElementMobile', () => {
  it('agrega un elemento correctamente', async () => {
    const { result } = renderHook(() => useAddElementMobile())

    // Ejecuta la acción
    let success: boolean = false
    await act(async () => {
      success = await result.current.addElementToCanvas('text')
    })

    expect(success).toBe(true)
    expect(result.current.isAdding).toBe(false)
    expect(result.current.lastAddedElement).toBe('text')
  })
})