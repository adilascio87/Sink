// Copies the single-file build to standalone/michelle.html — the one file you
// double-click to run Michelle locally, no server required.
import { copyFileSync, mkdirSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = resolve(root, 'dist-single/index.html')
const destDir = resolve(root, 'standalone')
const dest = resolve(destDir, 'michelle.html')

mkdirSync(destDir, { recursive: true })
copyFileSync(src, dest)

const kb = (statSync(dest).size / 1024).toFixed(0)
console.log(`\n✓ Standalone build ready: standalone/michelle.html (${kb} KB)`)
console.log('  Double-click it to open Michelle in your browser.\n')
