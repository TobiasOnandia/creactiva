import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { toast } from 'sonner';
import { TemplateType, useAddTemplateMobile } from '@/hooks/useAddTemplateMobile';
import { useCanvasStore } from '@/store/canvasStore';

// Mock 'sonner' para notificaciones toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock 'templateConfigs' para proveer datos de plantillas
vi.mock('@/config/templateConfigs', () => ({
  templateConfigs: {
    landing: {
      elements: [{ id: 'template-element-1', type: 'text', content: 'Test Text' }, { id: 'template-element-2', type: 'button', content: 'Test Button' }],
      layout: [{ x: 0, y: 0, w: 2, h: 1, minH: 1, minW: 1 }, { x: 0, y: 1, w: 1, h: 1, minH: 1, minW: 1 }],
    },
    dashboard: {
      elements: [{ id: 'template-element-1', type: 'text', content: 'Test Text' }, { id: 'template-element-2', type: 'button', content: 'Test Button' }],
      layout: [{ x: 0, y: 0, w: 2, h: 1, minH: 1, minW: 1 }, { x: 0, y: 1, w: 1, h: 1, minH: 1, minW: 1 }],
    },
    blog: {
      elements: [{ id: 'template-element-1', type: 'text', content: 'Test Text' }, { id: 'template-element-2', type: 'button', content: 'Test Button' }],
      layout: [{ x: 0, y: 0, w: 2, h: 1, minH: 1, minW: 1 }, { x: 0, y: 1, w: 1, h: 1, minH: 1, minW: 1 }],
    },
    portfolio: {
      elements: [{ id: 'template-element-1', type: 'text', content: 'Test Text' }, { id: 'template-element-2', type: 'button', content: 'Test Button' }],
      layout: [{ x: 0, y: 0, w: 2, h: 1, minH: 1, minW: 1 }, { x: 0, y: 1, w: 1, h: 1, minH: 1, minW: 1 }],
    },
    ecommerce: {
      elements: [{ id: 'template-element-1', type: 'text', content: 'Test Text' }, { id: 'template-element-2', type: 'button', content: 'Test Button' }],
      layout: [{ x: 0, y: 0, w: 2, h: 1, minH: 1, minW: 1 }, { x: 0, y: 1, w: 1, h: 1, minH: 1, minW: 1 }],
    },
  },
}));

// Mock 'GRID_CONFIG'
vi.mock('@/config', () => ({
  GRID_CONFIG: {
    cols: { lg: 12 },
    defaultSize: { w: 2, h: 2 },
    minSize: { w: 1, h: 1 },
  },
}));

// --- Configuración del Mock del Store ---
const mockAddElementToSection = vi.fn();
const mockUpdateSectionLayout = vi.fn();
let mockStoreState: any;

// Mock del store de Zustand. Usa la variable `mockStoreState`
// que se resetea antes de cada test para asegurar el aislamiento.
vi.mock('@/store/canvasStore', () => ({
  useCanvasStore: (selector: (state: any) => any) => selector(mockStoreState),
}));

describe('useAddTemplateMobile', () => {
    
  beforeEach(() => {
    // Resetea todos los mocks antes de cada test
    vi.clearAllMocks();

    // Define un estado fresco y por defecto para el store
    mockStoreState = {
      addElementToSection: mockAddElementToSection,
      updateSectionLayout: mockUpdateSectionLayout,
      activeSectionId: 'test-section-id',
      sections: [{
        id: 'test-section-id',
        layout: [
            { i: 'existing-1', x: 0, y: 0, w: 2, h: 2, minH: 1, minW: 1, static: false, isDraggable: true },
            { i: 'existing-2', x: 2, y: 0, w: 2, h: 1, minH: 1, minW: 1, static: false, isDraggable: true },
        ],
      }],
    };

    // Mock de crypto.randomUUID para devolver valores predecibles
    let idCounter = 0;
    vi.spyOn(global.crypto, 'randomUUID').mockImplementation(() => `mock-uuid-${idCounter++}`);
  });

  afterEach(() => {
    // Restaura cualquier función espiada o mockeada a su implementación original
    // y se asegura que los timers falsos no afecten a otros tests.
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('debería inicializar con valores por defecto correctos', () => {
    const { result } = renderHook(() => useAddTemplateMobile());
    expect(result.current.isAdding).toBe(false);
    expect(result.current.lastAddedTemplate).toBe(null);
    expect(typeof result.current.addTemplateToCanvas).toBe('function');
  });

  it('debería agregar exitosamente una plantilla al canvas', async () => {
    const { result } = renderHook(() => useAddTemplateMobile());

    let addResult: boolean | undefined;
    await act(async () => {
      addResult = await result.current.addTemplateToCanvas('landing');
    });

    expect(addResult).toBe(true);
    expect(mockAddElementToSection).toHaveBeenCalledTimes(2); // La plantilla 'landing' tiene 2 elementos
    expect(mockUpdateSectionLayout).toHaveBeenCalledOnce();
    expect(result.current.isAdding).toBe(false);
  });
  
  it('debería poner isAdding en true durante la adición y en false después', async () => {
    const { result } = renderHook(() => useAddTemplateMobile());

    let addPromise: Promise<boolean>;
    act(() => {
        addPromise = result.current.addTemplateToCanvas('dashboard');
    });

    expect(result.current.isAdding).toBe(true);

    await act(async () => {
        await addPromise;
    });
    
    expect(result.current.isAdding).toBe(false);
  });

  it('debería prevenir múltiples adiciones simultáneas', async () => {
    const { result } = renderHook(() => useAddTemplateMobile());

    // Simula una tarea de larga duración
    let resolveFirstCall: (value: unknown) => void;
    const firstCallPromise = new Promise(resolve => { resolveFirstCall = resolve; });
    mockAddElementToSection.mockImplementation(() => firstCallPromise);

    act(() => {
      result.current.addTemplateToCanvas('blog');
    });

    expect(result.current.isAdding).toBe(true);
    
    // Intenta una segunda adición
    let secondAddResult: boolean | undefined;
    await act(async () => {
      secondAddResult = await result.current.addTemplateToCanvas('portfolio');
    });

    // La segunda llamada debería ser bloqueada
    expect(secondAddResult).toBe(false);
    // La primera llamada a 'addTemplateToCanvas' con 'blog' (que tiene 2 elementos) debe continuar
    expect(mockAddElementToSection).toHaveBeenCalledTimes(1);
    
    await act(async () => {
        resolveFirstCall(true);
    });
  });

  it('debería manejar errores de adición de plantilla correctamente', async () => {
    const { result } = renderHook(() => useAddTemplateMobile());
    const testError = new Error('Test error');
    mockAddElementToSection.mockImplementation(() => { throw testError; });

    let addResult: boolean | undefined;
    await act(async () => {
      addResult = await result.current.addTemplateToCanvas('ecommerce');
    });
    
    expect(addResult).toBe(false);
    expect(result.current.isAdding).toBe(false);
    // Comprueba que se llamó al toast con el mensaje correcto que se ve en el log de error
    expect(toast.error).toHaveBeenCalledWith('Error al agregar template', expect.objectContaining({
        description: 'No se pudo agregar el template al canvas'
    }));
  });

  it('debería manejar un tipo de plantilla inválido', async () => {
    const { result } = renderHook(() => useAddTemplateMobile());
    let addResult: boolean | undefined;
    await act(async () => {
      addResult = await result.current.addTemplateToCanvas('invalid-template' as TemplateType);
    });

    expect(addResult).toBe(false);
    expect(result.current.isAdding).toBe(false);
    expect(mockAddElementToSection).not.toHaveBeenCalled();
    // Comprueba que se llamó al toast con el mensaje correcto que se ve en el log de error
    expect(toast.error).toHaveBeenCalledWith('Error al agregar template', expect.objectContaining({
        description: 'No se pudo agregar el template al canvas'
    }));
  });

  it('debería establecer y limpiar lastAddedTemplate correctamente', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useAddTemplateMobile());

    await act(async () => {
      await result.current.addTemplateToCanvas('landing');
    });

    expect(result.current.lastAddedTemplate).toBe('landing');

    // Avanza el tiempo para disparar el setTimeout
    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.lastAddedTemplate).toBe(null);
  });

  it('debería encontrar una posición disponible cuando el canvas está vacío', async () => {
    const { result } = renderHook(() => useAddTemplateMobile());
    mockStoreState.sections[0].layout = [];

    await act(async () => {
      await result.current.addTemplateToCanvas('portfolio');
    });

    expect(mockUpdateSectionLayout).toHaveBeenCalledWith(
      'test-section-id',
      expect.arrayContaining([
        expect.objectContaining({ x: 0, y: 0 }),
      ])
    );
  });

  it('debería crear los items de layout correctos desde la plantilla', async () => {
    const { result } = renderHook(() => useAddTemplateMobile());
    await act(async () => {
      await result.current.addTemplateToCanvas('dashboard');
    });

    const [sectionId, newLayout] = mockUpdateSectionLayout.mock.calls[0];
    
    expect(sectionId).toBe('test-section-id');
    expect(newLayout.length).toBe(4); // 2 existentes + 2 nuevos

    const newItem = newLayout.find((item:any) => item.i.startsWith('mock-uuid'));
    expect(newItem).toEqual(expect.objectContaining({
      i: expect.stringContaining('mock-uuid'),
      static: false,
      isDraggable: true,
    }));
  });

  it('debería agregar elementos a la sección correcta', async () => {
    const { result } = renderHook(() => useAddTemplateMobile());
    await act(async () => {
      await result.current.addTemplateToCanvas('blog');
    });
    
    expect(mockAddElementToSection).toHaveBeenCalledWith(
      expect.any(Object),
      'test-section-id'
    );
  });

  it('debería preservar el layout existente al agregar una nueva plantilla', async () => {
    const { result } = renderHook(() => useAddTemplateMobile());
    const originalLayout = [...mockStoreState.sections[0].layout];

    await act(async () => {
      await result.current.addTemplateToCanvas('ecommerce');
    });

    const [_, newLayout] = mockUpdateSectionLayout.mock.calls[0];

    expect(newLayout).toEqual(expect.arrayContaining(originalLayout));
    expect(newLayout.length).toBe(originalLayout.length + 2); // 2 existentes + 2 de la plantilla
  });
});
