import { resolve } from 'path';
export default {
  base: '/stitch/',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        button: resolve(__dirname, 'pages/components/button.html'),
      }
    }
  }
}