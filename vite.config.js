import { fileURLToPath, URL } from 'node:url'
import electron from "vite-plugin-electron/simple"

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(()=>{
  return {
    plugins: [
      vue(),
      electron({
        main: {
          entry: "./electron/background.js",
        },
      }),
    ],
    base: "./",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 1211,
      https: false,
      // open: true,
      ws: true,
      hmr: true,

      proxy: {
        "/api": {
          target: "http://127.0.0.1:3007",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
