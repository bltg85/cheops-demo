import { defineConfig } from 'vite'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
let shortHash = 'unknown'
try { shortHash = execSync('git rev-parse --short HEAD').toString().trim() } catch (_) {
  shortHash = (process.env.VERCEL_GIT_COMMIT_SHA || 'unknown').slice(0, 7)
}

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
