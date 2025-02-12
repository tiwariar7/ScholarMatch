import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/find_indian_scholarships': 'http://127.0.0.1:5000',
      '/find_international_scholarships': 'http://127.0.0.1:5000',
    },
  },
});

