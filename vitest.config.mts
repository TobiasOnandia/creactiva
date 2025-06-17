import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    testTimeout: 10000,
    hookTimeout: 10000,
    globals: true,
    environment: 'jsdom',
  },
})