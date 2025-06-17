import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { GridLayout } from '@/types/canvas/LayoutTypes'
import { CanvasElement, ElementConfig } from '@/types/canvas/CanvasTypes'
import { saveSite } from '@/app/actions/saveAction'

// Mock de las dependencias
vi.mock('@/utils/supabase/server')
vi.mock('next/cache')

const mockCreateClient = vi.mocked(createClient)
const mockRevalidatePath = vi.mocked(revalidatePath)

describe('saveSite', () => {
  let mockSupabase: any
  let mockUser: any
  let mockSiteData: any
  let mockExistingSite: any
  let mockSection: any

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock user
    mockUser = {
      id: 'user-123',
      email: 'test@example.com'
    }

    // Mock existing site
    mockExistingSite = {
      id: 'site-123',
      user_id: 'user-123',
      name: 'Existing Site',
      slug: 'existing-site',
      created_at: '2024-01-01T00:00:00.000Z'
    }

    // Mock section
    mockSection = {
      id: 'section-123',
      site_id: 'site-123',
      name: 'Home Section',
      slug: 'home',
      is_home: true,
      order_index: 0
    }

    // Mock de Supabase client
    mockSupabase = {
      auth: {
        getUser: vi.fn()
      },
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(),
            eq: vi.fn(() => ({
              single: vi.fn()
            }))
          })),
          in: vi.fn()
        })),
        upsert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn()
          }))
        })),
        delete: vi.fn(() => ({
          in: vi.fn()
        }))
      }))
    }

    mockCreateClient.mockResolvedValue(mockSupabase)

    // Mock site data
    mockSiteData = {
      name: 'Test Site',
      slug: 'test-site',
      sections: [
        {
          id: 'section-1',
          name: 'Home',
          slug: 'home',
          is_home: true,
          elements: [
            {
              id: 'element-1',
              type: 'text',
              config: { content: 'Hello World' }
            }
          ],
          layout: [
            {
              i: 'element-1',
              x: 0,
              y: 0,
              w: 4,
              h: 2,
              minH: 2,
              minW: 2,
              static: false,
              isDraggable: true
            }
          ]
        }
      ]
    }
  })

  it('should save site successfully for new user', async () => {
    // Arrange
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } })
    
    // No existing site
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: null })
        }))
      }))
    })

    // Site upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: { ...mockExistingSite, name: 'Test Site' }, 
            error: null 
          })
        }))
      }))
    })

    // Section upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: mockSection, 
            error: null 
          })
        }))
      }))
    })

    // Existing elements
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn().mockResolvedValue({ data: [] })
      }))
    })

    // Elements upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn().mockResolvedValue({ error: null })
      }))
    })

    // Existing layout
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: null })
          }))
        }))
      }))
    })

    // Layout upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn().mockResolvedValue({ error: null })
    })

    // Act
    const result = await saveSite(mockSiteData)

    // Assert
    expect(result).toEqual({ success: true })
    expect(mockSupabase.auth.getUser).toHaveBeenCalled()
    expect(mockRevalidatePath).toHaveBeenCalledWith('/')
  })

  it('should handle existing site update', async () => {
    // Arrange
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } })
    
    // Existing site
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: mockExistingSite })
        }))
      }))
    })

    // Site upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: mockExistingSite, 
            error: null 
          })
        }))
      }))
    })

    // Section upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: mockSection, 
            error: null 
          })
        }))
      }))
    })

    // Existing elements
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn().mockResolvedValue({ data: [] })
      }))
    })

    // Elements upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn().mockResolvedValue({ error: null })
      }))
    })

    // Existing layout
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: { id: 'layout-1' } })
          }))
        }))
      }))
    })

    // Layout upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn().mockResolvedValue({ error: null })
    })

    // Act
    const result = await saveSite(mockSiteData)

    // Assert
    expect(result).toEqual({ success: true })
  })

  it('should handle elements deletion', async () => {
    // Arrange
    const siteDataWithoutElements = {
      ...mockSiteData,
      sections: [{
        ...mockSiteData.sections[0],
        elements: []
      }]
    }

    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } })
    
    // Existing site
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: mockExistingSite })
        }))
      }))
    })

    // Site upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: mockExistingSite, 
            error: null 
          })
        }))
      }))
    })

    // Section upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: mockSection, 
            error: null 
          })
        }))
      }))
    })

    // Existing elements to delete
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn().mockResolvedValue({ 
          data: [{ id: 'element-to-delete' }] 
        })
      }))
    })

    // Delete elements
    mockSupabase.from.mockReturnValueOnce({
      delete: vi.fn(() => ({
        in: vi.fn().mockResolvedValue({ error: null })
      }))
    })

    // Existing layout
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: null })
          }))
        }))
      }))
    })

    // Layout upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn().mockResolvedValue({ error: null })
    })

    // Act
    const result = await saveSite(siteDataWithoutElements)

    // Assert
    expect(result).toEqual({ success: true })
  })

  it('should handle temporary element IDs correctly', async () => {
    // Arrange
    const siteDataWithTempIds = {
      ...mockSiteData,
      sections: [{
        ...mockSiteData.sections[0],
        elements: [
          {
            id: 'temp_id_123',
            type: 'text',
            config: { content: 'Temp element' }
          },
          {
            id: 'element-1',
            type: 'text',
            config: { content: 'Real element' }
          }
        ]
      }]
    }

    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } })
    
    // Mock chain for existing site
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: mockExistingSite })
        }))
      }))
    })

    // Site upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: mockExistingSite, 
            error: null 
          })
        }))
      }))
    })

    // Section upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: mockSection, 
            error: null 
          })
        }))
      }))
    })

    // Existing elements
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn().mockResolvedValue({ data: [] })
      }))
    })

    // Elements upsert - verify it's called with correct data
  const mockElementsUpsert = vi.fn<(elements: Element[]) => any>(() => ({
  select: vi.fn().mockResolvedValue({ error: null })
}))

    mockSupabase.from.mockReturnValueOnce({
      upsert: mockElementsUpsert
    })

    // Existing layout
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: null })
          }))
        }))
      }))
    })

    // Layout upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn().mockResolvedValue({ error: null })
    })

    // Act
    const result = await saveSite(siteDataWithTempIds)

    // Assert
    expect(result).toEqual({ success: true })
    
    // Verify that temp IDs are not included in upsert
    const upsertCall = mockElementsUpsert.mock.calls[0][0]
    expect(upsertCall).toHaveLength(2)
    expect(upsertCall?.[0]).not.toHaveProperty('id') 
    expect(upsertCall?.[1]).toHaveProperty('id', 'element-1')
  })

  it('should return error when user is not authenticated', async () => {
    // Arrange
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } })

    // Act
    const result = await saveSite(mockSiteData)

    // Assert
    expect(result).toEqual({ 
      success: false, 
      error: expect.any(Error)
    })
    expect(mockRevalidatePath).not.toHaveBeenCalled()
  })

  it('should handle site upsert error', async () => {
    // Arrange
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } })
    
    // Existing site
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: mockExistingSite })
        }))
      }))
    })

    // Site upsert with error
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: null, 
            error: { message: 'Site upsert failed' }
          })
        }))
      }))
    })

    // Act
    const result = await saveSite(mockSiteData)

    // Assert
    expect(result).toEqual({ 
      success: false, 
      error: { message: 'Site upsert failed' }
    })
    expect(mockRevalidatePath).not.toHaveBeenCalled()
  })

  it('should handle section upsert error', async () => {
    // Arrange
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } })
    
    // Existing site
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: mockExistingSite })
        }))
      }))
    })

    // Site upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: mockExistingSite, 
            error: null 
          })
        }))
      }))
    })

    // Section upsert with error
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: null, 
            error: { message: 'Section upsert failed' }
          })
        }))
      }))
    })

    // Act
    const result = await saveSite(mockSiteData)

    // Assert
    expect(result).toEqual({ 
      success: false, 
      error: { message: 'Section upsert failed' }
    })
  })

  it('should handle elements upsert error', async () => {
    // Arrange
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } })
    
    // Existing site
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: mockExistingSite })
        }))
      }))
    })

    // Site upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: mockExistingSite, 
            error: null 
          })
        }))
      }))
    })

    // Section upsert
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: mockSection, 
            error: null 
          })
        }))
      }))
    })

    // Existing elements
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn().mockResolvedValue({ data: [] })
      }))
    })

    // Elements upsert with error
    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn().mockResolvedValue({ 
          error: { message: 'Elements upsert failed' }
        })
      }))
    })

    // Act
    const result = await saveSite(mockSiteData)

    // Assert
    expect(result).toEqual({ 
      success: false, 
      error: { message: 'Elements upsert failed' }
    })
  })

  it('should handle layout validation correctly', async () => {
    // Arrange
    const siteDataWithIncompleteLayout = {
      ...mockSiteData,
      sections: [{
        ...mockSiteData.sections[0],
        layout: [{
          i: 'element-1',
          x: 0,
          y: 0,
          w: 4,
          h: 2
          // Missing minH, minW, static, isDraggable
        }]
      }]
    }

    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } })
    
    // Mock successful chain
    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: mockExistingSite })
        }))
      }))
    })

    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: mockExistingSite, 
            error: null 
          })
        }))
      }))
    })

    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ 
            data: mockSection, 
            error: null 
          })
        }))
      }))
    })

    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn().mockResolvedValue({ data: [] })
      }))
    })

    mockSupabase.from.mockReturnValueOnce({
      upsert: vi.fn(() => ({
        select: vi.fn().mockResolvedValue({ error: null })
      }))
    })

    mockSupabase.from.mockReturnValueOnce({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: null })
          }))
        }))
      }))
    })

    // Layout upsert - verify it's called with validated data
    const mockLayoutUpsert = vi.fn().mockResolvedValue({ error: null })
    mockSupabase.from.mockReturnValueOnce({
      upsert: mockLayoutUpsert
    })

    // Act
    const result = await saveSite(siteDataWithIncompleteLayout)

    // Assert
    expect(result).toEqual({ success: true })
    
    // Verify layout validation
    const layoutCall = mockLayoutUpsert.mock.calls[0][0]
    expect(layoutCall.layout_data[0]).toEqual({
      i: 'element-1',
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      minH: 2, // Default value
      minW: 2, // Default value
      static: false, // Default value
      isDraggable: true // Default value
    })
  })

  it('should handle multiple sections', async () => {
    // Arrange
    const siteDataWithMultipleSections = {
      ...mockSiteData,
      sections: [
        mockSiteData.sections[0],
        {
          id: 'section-2',
          name: 'About',
          slug: 'about',
          is_home: false,
          elements: [],
          layout: []
        }
      ]
    }

    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } })
    
    // Mock successful responses for all operations
    mockSupabase.from
      .mockReturnValueOnce({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: mockExistingSite })
          }))
        }))
      })
      .mockReturnValueOnce({
        upsert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ 
              data: mockExistingSite, 
              error: null 
            })
          }))
        }))
      })
      // First section
      .mockReturnValueOnce({
        upsert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ 
              data: mockSection, 
              error: null 
            })
          }))
        }))
      })
      .mockReturnValueOnce({
        select: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ data: [] })
        }))
      })
      .mockReturnValueOnce({
        upsert: vi.fn(() => ({
          select: vi.fn().mockResolvedValue({ error: null })
        }))
      })
      .mockReturnValueOnce({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn().mockResolvedValue({ data: null })
            }))
          }))
        }))
      })
      .mockReturnValueOnce({
        upsert: vi.fn().mockResolvedValue({ error: null })
      })
      // Second section
      .mockReturnValueOnce({
        upsert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ 
              data: { ...mockSection, id: 'section-2' }, 
              error: null 
            })
          }))
        }))
      })
      .mockReturnValueOnce({
        select: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ data: [] })
        }))
      })
      .mockReturnValueOnce({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn().mockResolvedValue({ data: null })
            }))
          }))
        }))
      })
      .mockReturnValueOnce({
        upsert: vi.fn().mockResolvedValue({ error: null })
      })

    // Act
    const result = await saveSite(siteDataWithMultipleSections)

    // Assert
    expect(result).toEqual({ success: true })
  })
})