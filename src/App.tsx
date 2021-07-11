/*
 * @Author: lynn
 * @Date: 2021-07-11 15:32:53
 * @LastEditTime: 2021-07-11 17:24:04
 * @LastEditors: lynn
 * @Description:
 */
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld'
import '@/App.scss'
import Logo from './assets/logo.png'

// vite 中不兼容 CommonJS
// const Logo = require('./assets/logo.png')

const App = defineComponent({
    setup() {
        return () => (
            <>
                <img alt="Vue logo" src={Logo} />
                <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
            </>
        )
    }
})

export default App
