import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { login, signup } from '@/app/actions/loginAction'

// Mock de las dependencias
vi.mock('@/utils/supabase/server')
vi.mock('next/cache')
vi.mock('next/navigation')

const mockCreateClient = vi.mocked(createClient)
const mockRevalidatePath = vi.mocked(revalidatePath)
const mockRedirect = vi.mocked(redirect)

describe('Auth Actions', () => {
  let mockSupabase: any
  let mockFormData: FormData

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock del cliente de Supabase
    mockSupabase = {
      auth: {
        signInWithPassword: vi.fn(),
        signUp: vi.fn(),
      },
    }
    
    mockCreateClient.mockResolvedValue(mockSupabase)
    
    // Mock de redirect para que no lance error
    mockRedirect.mockImplementation(() => {
      throw new Error('NEXT_REDIRECT') // Next.js 15 behavior
    })
  })

  describe('login', () => {
    beforeEach(() => {
      mockFormData = new FormData()
      mockFormData.append('email', 'test@example.com')
      mockFormData.append('password', 'password123')
    })

    it('should login successfully and redirect', async () => {
      // Arrange
      mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: null })

      // Act & Assert
      await expect(login(mockFormData)).rejects.toThrow('NEXT_REDIRECT')

      // Verify
      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
      expect(mockRevalidatePath).toHaveBeenCalledWith('/', 'layout')
      expect(mockRedirect).toHaveBeenCalledWith('/')
    })

    it('should return error when login fails', async () => {
      // Arrange
      const errorMessage = 'Invalid credentials'
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        error: { message: errorMessage }
      })

      // Act
      const result = await login(mockFormData)

      // Assert
      expect(result).toEqual({ error: errorMessage })
      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
      expect(mockRevalidatePath).not.toHaveBeenCalled()
      expect(mockRedirect).not.toHaveBeenCalled()
    })

    it('should handle missing form data', async () => {
      // Arrange
      const emptyFormData = new FormData()
      mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: null })

      // Act & Assert
      await expect(login(emptyFormData)).rejects.toThrow('NEXT_REDIRECT')

      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: null,
        password: null,
      })
    })
  })

  describe('signup', () => {
    beforeEach(() => {
      mockFormData = new FormData()
      mockFormData.append('email', 'newuser@example.com')
      mockFormData.append('password', 'newpassword123')
      mockFormData.append('username', 'newuser')
    })

    it('should signup successfully and redirect', async () => {
      // Arrange
      mockSupabase.auth.signUp.mockResolvedValue({ error: null })

      // Act & Assert
      await expect(signup(mockFormData)).rejects.toThrow('NEXT_REDIRECT')

      // Verify
      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: 'newuser@example.com',
        password: 'newpassword123',
        options: {
          data: {
            username: 'newuser',
          },
        },
      })
      expect(mockRevalidatePath).toHaveBeenCalledWith('/', 'layout')
      expect(mockRedirect).toHaveBeenCalledWith('/')
    })

    it('should return error when signup fails', async () => {
      // Arrange
      const errorMessage = 'User already exists'
      mockSupabase.auth.signUp.mockResolvedValue({
        error: { message: errorMessage }
      })

      // Act
      const result = await signup(mockFormData)

      // Assert
      expect(result).toEqual({ error: errorMessage })
      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: 'newuser@example.com',
        password: 'newpassword123',
        options: {
          data: {
            username: 'newuser',
          },
        },
      })
      expect(mockRevalidatePath).not.toHaveBeenCalled()
      expect(mockRedirect).not.toHaveBeenCalled()
    })

    it('should handle missing username in form data', async () => {
      // Arrange
      const formDataWithoutUsername = new FormData()
      formDataWithoutUsername.append('email', 'test@example.com')
      formDataWithoutUsername.append('password', 'password123')
      
      mockSupabase.auth.signUp.mockResolvedValue({ error: null })

      // Act & Assert
      await expect(signup(formDataWithoutUsername)).rejects.toThrow('NEXT_REDIRECT')

      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        options: {
          data: {
            username: null,
          },
        },
      })
    })

    it('should handle supabase client creation error', async () => {
      // Arrange
      const createClientError = new Error('Failed to create client')
      mockCreateClient.mockRejectedValue(createClientError)

      // Act & Assert
      await expect(login(mockFormData)).rejects.toThrow('Failed to create client')
    })
  })

  describe('Edge cases', () => {
    it('should handle supabase auth throwing an exception', async () => {
      // Arrange
      mockFormData = new FormData()
      mockFormData.append('email', 'test@example.com')
      mockFormData.append('password', 'password123')
      
      const authError = new Error('Network error')
      mockSupabase.auth.signInWithPassword.mockRejectedValue(authError)

      // Act & Assert
      await expect(login(mockFormData)).rejects.toThrow('Network error')
    })

    it('should handle empty form data gracefully', async () => {
      // Arrange
      const emptyFormData = new FormData()
      mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: null })

      // Act & Assert
      await expect(login(emptyFormData)).rejects.toThrow('NEXT_REDIRECT')
      
      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: null,
        password: null,
      })
    })
  })
})