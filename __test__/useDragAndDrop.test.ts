import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useDragAndDrop } from '../hooks/useDragAndDrop'

// Declara los mocks ANTES de usarlos en vi.mock()
const mockAddElementToSection = vi.fn()
const mockUpdateSectionLayout = vi.fn()
const mockCreateElement = vi.fn()

// Opción 1: Usar vi.mock() sin factory function
vi.mock('@/store/canvasStore')
vi.mock('@/components/factories/elementFactory')
vi.mock('@/config')
vi.mock('@/config/elementConfig')
vi.mock('@/config/templateConfigs')

// Importar los módulos mockeados después de declararlos
import { useCanvasStore } from '@/store/canvasStore'
import { ElementFactory } from '@/components/factories/elementFactory'
import { GRID_CONFIG } from '@/config'
import { ELEMENT_TYPE_CONFIG } from '@/config/elementConfig'
import { templateConfigs } from '@/config/templateConfigs'

// Configurar los mocks usando vi.mocked()
vi.mocked(useCanvasStore).mockImplementation((selector: any) => selector({
  addElementToSection: mockAddElementToSection,
  updateSectionLayout: mockUpdateSectionLayout,
  activeSectionId: 'section-1',
  sections: [{ id: 'section-1', layout: [] }],
}))

vi.mocked(ElementFactory).createElement = mockCreateElement

vi.mocked(GRID_CONFIG).cols = { lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 }
vi.mocked(GRID_CONFIG).defaultSize = { w: 4, h: 4 }
vi.mocked(GRID_CONFIG).minSize = { w: 0.5, h: 0.5 }

vi.mocked(ELEMENT_TYPE_CONFIG).text = {
    w: 4,
    h: 5,
}

vi.mocked(templateConfigs)['template-type'] = {
  elements: [{ type: 'text', id: 'element-1', config: {} }],
  layout: [{ w: 4, h: 4, minH: 2, minW: 2, static: false, isDraggable: true, x: 0, y: 0, i: 'element-1' }]
}

describe('useDragAndDrop', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCreateElement.mockImplementation((type) => ({ id: 'element-1', type }))
  })

  it('debe manejar el drop de un elemento simple', () => {
    const setCurrentLayout = vi.fn()
    const { result } = renderHook(() => useDragAndDrop([], setCurrentLayout))
    
    const mockEvent = {
      dataTransfer: {
        getData: vi.fn().mockReturnValue('text')
      }
    } as unknown as DragEvent
    
    const item = { x: 0, y: 0 } as any
    
    result.current.handleDrop([], item, mockEvent)
    
    expect(mockCreateElement).toHaveBeenCalledWith('text')
    expect(mockAddElementToSection).toHaveBeenCalled()
    expect(mockUpdateSectionLayout).toHaveBeenCalled()
    expect(setCurrentLayout).toHaveBeenCalled()
  })

  it('debe manejar el drop de un template', () => {
    const setCurrentLayout = vi.fn()
    const { result } = renderHook(() => useDragAndDrop([], setCurrentLayout))
    
    const mockEvent = {
      dataTransfer: {
        getData: vi.fn().mockReturnValue('template-type')
      }
    } as unknown as DragEvent
    
    const item = { x: 0, y: 0 } as any
    
    result.current.handleDrop([], item, mockEvent)
    
    expect(mockAddElementToSection).toHaveBeenCalled()
    expect(mockUpdateSectionLayout).toHaveBeenCalled()
    expect(setCurrentLayout).toHaveBeenCalled()
  })

  it('debe manejar drop sin tipo de elemento', () => {
    const setCurrentLayout = vi.fn()
    const { result } = renderHook(() => useDragAndDrop([], setCurrentLayout))
    
    const mockEvent = {
      dataTransfer: {
        getData: vi.fn().mockReturnValue('')
      }
    } as unknown as DragEvent
    
    const item = { x: 0, y: 0 } as any
    
    result.current.handleDrop([], item, mockEvent)
    
    expect(mockAddElementToSection).not.toHaveBeenCalled()
    expect(mockUpdateSectionLayout).not.toHaveBeenCalled()
    expect(setCurrentLayout).not.toHaveBeenCalled()
  })
})