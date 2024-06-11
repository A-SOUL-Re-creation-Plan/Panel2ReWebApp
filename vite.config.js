import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({command})=>{
  const apiaddr = {
    'serve': 'http://localhost:3007',
    'build': 'https://p2re_api.xxxxxxxxx.eu.org'
  }
  return{
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 1211,
      https: false,
      open: true,
      ws: true,

      proxy: {
        "/api": {
          target: apiaddr[command],
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  }
});
