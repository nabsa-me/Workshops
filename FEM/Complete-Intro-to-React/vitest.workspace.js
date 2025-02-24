import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: './vite.config.js',
    test: {
      include: ['**/*.node.test.{js,jsx}'],
      name: 'happy-dom',
      coverage: { provider: 'istanbul', reporter: ['text', 'json', 'html'] },
      environment: 'happy-dom'
    }
  },
  {
    extends: './vite.config.js',
    test: {
      setupFiles: ['vitest-browser-react'],
      include: ['**/*.browser.test.{js,jsx}'],
      name: 'browser',
      coverage: { provider: 'istanbul', reporter: ['text', 'json', 'html'] },
      browser: {
        provider: 'playwright',
        enabled: true,
        name: 'chromium'
      }
    }
  }
])
