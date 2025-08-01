import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,         // Set to your desired port
    strictPort: true,   // Prevent fallback to other ports
  },
});
