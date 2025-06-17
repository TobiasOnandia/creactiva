import { loadSite } from '@/app/actions/loadSiteAction'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockUser = {
  id: 'user-123',
  email: 'test@example.com'
}

const mockSite = {
  id: 'site-123',
  user_id: 'user-123',
  name: 'Mi Sitio Test',
  slug: 'mi-sitio-test',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
}

const mockSection = {
  id: 'section-123',
  site_id: 'site-123',
  name: 'Inicio',
  slug: 'inicio',
  is_home: true,
  order_index: 0,
  elements: [
    {
      id: 'element-123',
      type: 'text',
      config: { content: 'Hello World' }
    }
  ],
  layouts: [
    {
      layout_data: [
        {
          i: 'element-123',
          x: 0,
          y: 0,
          w: 2,
          h: 1,
          minH: 1,
          minW: 1,
          static: false,
          isDraggable: true
        }
      ]
    }
  ]
}

// Función helper para crear mock query chain
const createMockQueryChain = () => {
  const mockChain = {
    select: vi.fn(),
    eq: vi.fn(),
    single: vi.fn(),
    insert: vi.fn(),
    order: vi.fn()
  }
  
  // Hacer que cada método retorne el objeto para chaining
  mockChain.select.mockReturnValue(mockChain)
  mockChain.eq.mockReturnValue(mockChain)
  mockChain.insert.mockReturnValue(mockChain)
  mockChain.order.mockReturnValue(mockChain)
  
  return mockChain
}

// Mocks de Supabase
const mockSupabaseClient = {
  auth: {
    getUser: vi.fn()
  },
  from: vi.fn()
}

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(() => Promise.resolve(mockSupabaseClient))
}))

describe('loadSite', () => {

  beforeEach(() => {
    vi.clearAllMocks()
    mockSupabaseClient.from.mockReturnValue(createMockQueryChain())
  })

  it('debe cargar un sitio existente correctamente', async () => {
    // Arrange
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })

    mockSupabaseClient.from().single.mockResolvedValueOnce({
      data: mockSite,
      error: null
    })

    mockSupabaseClient.from().order.mockResolvedValue({
      data: [mockSection],
      error: null
    })

    // Act
    const result = await loadSite()

    // Assert
    expect(result.success).toBe(true)
    expect(result.site).toEqual(mockSite)
    expect(result.sections).toHaveLength(1)
    expect(result.sections![0]).toEqual({
      id: 'section-123',
      name: 'Inicio',
      slug: 'inicio',
      isHome: true,
      elements: [
        {
          id: 'element-123',
          type: 'text',
          config: { content: 'Hello World', type: 'text' }
        }
      ],
      layout: [
        {
          i: 'element-123',
          x: 0,
          y: 0,
          w: 2,
          h: 1,
          minH: 1,
          minW: 1,
          static: false,
          isDraggable: true
        }
      ]
    })
  })

  it('debe crear un sitio nuevo cuando no existe', async () => {
    // Arrange
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })

    // Crear diferentes instancias del mock para cada llamada
    const mockQueryForSite = createMockQueryChain()
    const mockQueryForNewSite = createMockQueryChain()
    const mockQueryForSection = createMockQueryChain()
    const mockQueryForLayout = createMockQueryChain()
    const mockQueryForSections = createMockQueryChain()

    mockSupabaseClient.from
      .mockReturnValueOnce(mockQueryForSite)      // Primera llamada: buscar sitio
      .mockReturnValueOnce(mockQueryForNewSite)   // Segunda llamada: crear sitio
      .mockReturnValueOnce(mockQueryForSection)   // Tercera llamada: crear sección
      .mockReturnValueOnce(mockQueryForLayout)    // Cuarta llamada: crear layout
      .mockReturnValueOnce(mockQueryForSections)  // Quinta llamada: obtener secciones

    // Simular que no existe el sitio
    mockQueryForSite.single.mockResolvedValue({
      data: null,
      error: { code: 'PGRST116' }
    })

    // Mock para crear sitio
    mockQueryForNewSite.single.mockResolvedValue({
      data: { ...mockSite, slug: `mi-sitio-${mockUser.id.slice(0, 8)}` },
      error: null
    })

    // Mock para crear sección
    mockQueryForSection.single.mockResolvedValue({
      data: mockSection,
      error: null
    })

    // Mock para crear layout
    mockQueryForLayout.insert.mockResolvedValue({
      data: null,
      error: null
    })

    // Mock para obtener secciones
    mockQueryForSections.order.mockResolvedValue({
      data: [mockSection],
      error: null
    })

    // Act
    const result = await loadSite()

    // Assert
    expect(result.success).toBe(true)
    expect(mockSupabaseClient.from).toHaveBeenCalledWith('sites')
    expect(mockSupabaseClient.from).toHaveBeenCalledWith('sections')
    expect(mockSupabaseClient.from).toHaveBeenCalledWith('layouts')
  })

  it('debe manejar error de autenticación', async () => {
    // Arrange
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: { message: 'No autorizado' }
    })

    // Act
    const result = await loadSite()

    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toBe('Error de autenticación: No autorizado')
  })

  it('debe manejar usuario no encontrado', async () => {
    // Arrange
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: null
    })

    // Act
    const result = await loadSite()

    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toBe('No se encontró usuario autenticado')
  })

  it('debe manejar error al crear sitio nuevo', async () => {
    // Arrange
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })

    const mockQueryForSite = createMockQueryChain()
    const mockQueryForNewSite = createMockQueryChain()

    mockSupabaseClient.from
      .mockReturnValueOnce(mockQueryForSite)
      .mockReturnValueOnce(mockQueryForNewSite)

    mockQueryForSite.single.mockResolvedValue({
      data: null,
      error: { code: 'PGRST116' }
    })

    mockQueryForNewSite.single.mockResolvedValue({
      data: null,
      error: { message: 'Error al crear sitio' }
    })

    // Act
    const result = await loadSite()

    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toBe('Error al crear el sitio: Error al crear sitio')
  })

  it('debe manejar error al crear sección inicial', async () => {
    // Arrange
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })

    const mockQueryForSite = createMockQueryChain()
    const mockQueryForNewSite = createMockQueryChain()
    const mockQueryForSection = createMockQueryChain()

    mockSupabaseClient.from
      .mockReturnValueOnce(mockQueryForSite)
      .mockReturnValueOnce(mockQueryForNewSite)
      .mockReturnValueOnce(mockQueryForSection)

    mockQueryForSite.single.mockResolvedValue({
      data: null,
      error: { code: 'PGRST116' }
    })

    mockQueryForNewSite.single.mockResolvedValue({
      data: mockSite,
      error: null
    })

    mockQueryForSection.single.mockResolvedValue({
      data: null,
      error: { message: 'Error al crear sección' }
    })

    // Act
    const result = await loadSite()

    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toBe('Error al crear la sección inicial: Error al crear sección')
  })

  it('debe manejar error al crear layout inicial', async () => {
    // Arrange
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })

    const mockQueryForSite = createMockQueryChain()
    const mockQueryForNewSite = createMockQueryChain()
    const mockQueryForSection = createMockQueryChain()
    const mockQueryForLayout = createMockQueryChain()

    mockSupabaseClient.from
      .mockReturnValueOnce(mockQueryForSite)
      .mockReturnValueOnce(mockQueryForNewSite)
      .mockReturnValueOnce(mockQueryForSection)
      .mockReturnValueOnce(mockQueryForLayout)

    mockQueryForSite.single.mockResolvedValue({
      data: null,
      error: { code: 'PGRST116' }
    })

    mockQueryForNewSite.single.mockResolvedValue({
      data: mockSite,
      error: null
    })

    mockQueryForSection.single.mockResolvedValue({
      data: mockSection,
      error: null
    })

    // El layout usa solo insert() sin select() ni single()
    mockQueryForLayout.insert.mockResolvedValue({
      data: null,
      error: { message: 'Error al crear layout' }
    })

    // Act
    const result = await loadSite()

    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toBe('Error al crear el layout inicial: Error al crear layout')
  })

  it('debe manejar error al obtener secciones', async () => {
    // Arrange
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })

    const mockQueryForSite = createMockQueryChain()
    const mockQueryForSections = createMockQueryChain()

    mockSupabaseClient.from
      .mockReturnValueOnce(mockQueryForSite)
      .mockReturnValueOnce(mockQueryForSections)

    mockQueryForSite.single.mockResolvedValue({
      data: mockSite,
      error: null
    })

    mockQueryForSections.order.mockResolvedValue({
      data: null,
      error: { message: 'Error al obtener secciones' }
    })

    // Act
    const result = await loadSite()

    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toBe('Error al obtener las secciones: Error al obtener secciones')
  })

  it('debe validar y transformar datos de layout correctamente', async () => {
    // Arrange
    const sectionWithInvalidLayout = {
      ...mockSection,
      layouts: [
        {
          layout_data: [
            {
              i: 'element-123',
              x: '0', // String que debe convertirse a number
              y: '1',
              w: '2',
              h: '1',
              minH: undefined,
              minW: undefined
            }
          ]
        }
      ]
    }

    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })

    const mockQueryForSite = createMockQueryChain()
    const mockQueryForSections = createMockQueryChain()

    mockSupabaseClient.from
      .mockReturnValueOnce(mockQueryForSite)
      .mockReturnValueOnce(mockQueryForSections)

    mockQueryForSite.single.mockResolvedValue({
      data: mockSite,
      error: null
    })

    mockQueryForSections.order.mockResolvedValue({
      data: [sectionWithInvalidLayout],
      error: null
    })

    // Act
    const result = await loadSite()

    // Assert
    expect(result.success).toBe(true)
    expect(result.sections![0].layout[0]).toEqual({
      i: 'element-123',
      x: 0,
      y: 1,
      w: 2,
      h: 1,
      minH: undefined,
      minW: undefined,
      static: undefined,
      isDraggable: undefined
    })
  })

  it('debe manejar secciones sin layouts', async () => {
    // Arrange
    const sectionWithoutLayouts = {
      ...mockSection,
      layouts: []
    }

    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })

    const mockQueryForSite = createMockQueryChain()
    const mockQueryForSections = createMockQueryChain()

    mockSupabaseClient.from
      .mockReturnValueOnce(mockQueryForSite)
      .mockReturnValueOnce(mockQueryForSections)

    mockQueryForSite.single.mockResolvedValue({
      data: mockSite,
      error: null
    })

    mockQueryForSections.order.mockResolvedValue({
      data: [sectionWithoutLayouts],
      error: null
    })

    // Act
    const result = await loadSite()

    // Assert
    expect(result.success).toBe(true)
    expect(result.sections![0].layout).toEqual([])
  })

  it('debe manejar secciones sin elementos', async () => {
    // Arrange
    const sectionWithoutElements = {
      ...mockSection,
      elements: null
    }

    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })

    const mockQueryForSite = createMockQueryChain()
    const mockQueryForSections = createMockQueryChain()

    mockSupabaseClient.from
      .mockReturnValueOnce(mockQueryForSite)
      .mockReturnValueOnce(mockQueryForSections)

    mockQueryForSite.single.mockResolvedValue({
      data: mockSite,
      error: null
    })

    mockQueryForSections.order.mockResolvedValue({
      data: [sectionWithoutElements],
      error: null
    })

    // Act
    const result = await loadSite()

    // Assert
    expect(result.success).toBe(true)
    expect(result.sections![0].elements).toEqual([])
  })

  it('debe manejar error genérico sin tipo Error', async () => {
    // Arrange
    mockSupabaseClient.auth.getUser.mockRejectedValue('Error string')

    // Act
    const result = await loadSite()

    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toBe('Error al cargar el sitio')
  })

  it('debe generar slug único correctamente', async () => {
    // Arrange
    const userWithLongId = { ...mockUser, id: 'very-long-user-id-123456789' }
    
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: userWithLongId },
      error: null
    })

    const mockQueryForSite = createMockQueryChain()
    const mockQueryForNewSite = createMockQueryChain()
    const mockQueryForSection = createMockQueryChain()
    const mockQueryForLayout = createMockQueryChain()
    const mockQueryForSections = createMockQueryChain()

    mockSupabaseClient.from
      .mockReturnValueOnce(mockQueryForSite)
      .mockReturnValueOnce(mockQueryForNewSite)
      .mockReturnValueOnce(mockQueryForSection)
      .mockReturnValueOnce(mockQueryForLayout)
      .mockReturnValueOnce(mockQueryForSections)

    mockQueryForSite.single.mockResolvedValue({
      data: null,
      error: { code: 'PGRST116' }
    })

    mockQueryForNewSite.single.mockResolvedValue({
      data: { ...mockSite, slug: `mi-sitio-${userWithLongId.id.slice(0, 8)}` },
      error: null
    })

    mockQueryForSection.single.mockResolvedValue({
      data: mockSection,
      error: null
    })

    mockQueryForLayout.insert.mockResolvedValue({
      data: null,
      error: null
    })

    mockQueryForSections.order.mockResolvedValue({
      data: [mockSection],
      error: null
    })

    // Act
    const result = await loadSite()

    // Assert
    expect(result.success).toBe(true)
    expect(mockQueryForNewSite.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        slug: 'mi-sitio-very-lon'
      })
    )
  })
})