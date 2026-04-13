import { defineConfig } from 'vite'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
const shortHash = execSync('git rev-parse --short HEAD').toString().trim()

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  define: {
    __APP_VERSION__: JSON.stringify(`v${pkg.version}(${shortHash})`)
  }
})
