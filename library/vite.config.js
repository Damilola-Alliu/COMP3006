import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['socket.io-client'],
  },
  plugins: [react()],
  build: {
    outDir: 'build', // This line sets the output directory to 'build'
  },
  test: {
    globals: true,
    environment: "jsdom",
    css: true
  }
})
