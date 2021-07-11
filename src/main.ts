import { createApp } from 'vue'
import App from './App'

import { ElButton, ElTimePicker, ElInput, locale } from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'

// element-plus bug
// @ts-ignore
import.meta.env.DEV ? locale(lang) : locale.use(lang)

const app = createApp(App)
app.use(ElButton)
app.use(ElTimePicker)
app.use(ElInput)
app.mount('#app')
