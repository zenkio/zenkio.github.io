
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// For a user/organization site (username.github.io) we can keep base as '/'.
// If you deploy under a project site repo, set base to '/<repo-name>/'.
export default defineConfig({
  plugins: [react()],
  base: '/'
})
