import { defineConfig } from 'dumi'
import style from './resetDumiStyle'
const path = require('path')

export default defineConfig({
  themeConfig: {
    name: 'AlloyForm',
    logo: 'http://sj4g6r8rr.sabkt.gdipper.com/alloy-form.png',
    rtl: true,
    nav: {
      mode: 'append',
      value: [{ title: 'GitHub', link: 'https://github.com/lvgx1128/alloy-form' }]
    },
    footer: 'Copyright © 2024 alloy-form'
  },
  favicons: [
    // 完整地址
    'http://sj4g6r8rr.sabkt.gdipper.com/alloy-form.png',
    // 此时将指向 `/favicon.png` ，确保你的项目含有 `public/favicon.png`
    '/alloy-form.png'
  ],
  title: 'alloy-form',
  outputPath: 'docs-dist',
  hash: true,
  styles: [style],
  alias: {
    //FIXME:@支持
    '@': path.resolve(process.cwd(), 'src'),
    'alloy-from': path.resolve(process.cwd(), 'src/index.ts')
  }
})
