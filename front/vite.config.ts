import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration Vite optimisée pour les montages réseau PSF
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Permettre l'accès aux fichiers sur les montages réseau
      strict: false,
      allow: ['..']
    },
    watch: {
      // Désactiver le polling pour éviter les problèmes de performance sur PSF
      usePolling: false,
      // Ignorer node_modules pour améliorer les performances
      ignored: ['**/node_modules/**']
    },
    // Configuration réseau
    host: 'localhost',
    port: 5173,
    // Forcer le rechargement complet plutôt que le HMR sur les montages réseau
    hmr: {
      overlay: true
    }
  },
  resolve: {
    // Configuration pour améliorer la résolution des modules
    preserveSymlinks: false
  },
  optimizeDeps: {
    // Forcer la pré-compilation des dépendances
    force: true,
    include: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled']
  },
  build: {
    // Configuration pour améliorer la compatibilité
    commonjsOptions: {
      include: [/node_modules/]
    }
  }
})
