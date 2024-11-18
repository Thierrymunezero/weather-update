import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '10.200.17.104',  // Allow connections from the local network
    port: 3050,      // Specify the port (optional, default is 5173)
  },
})
