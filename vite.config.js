import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // This is the key part for development
    proxy: {
      // If your API calls start with /api, e.g., fetch('/api/tours')
      '/api': {
        // Target: The URL of your remote backend
        target: 'https://alpha-backend-iieo.onrender.com',
        // Change the origin of the host header to the target URL
        changeOrigin: true,
        // Optional: Rewrite the path if your frontend calls don't include a necessary prefix
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
    // Optional: Set the host to 0.0.0.0 if you need network access
    // host: '0.0.0.0',
    port: 5173, // Assuming your port is 5173
  }
})
