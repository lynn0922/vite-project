import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'

const isDev = () => process.env.NODE_ENV === 'development'

export default defineConfig({
    mode: isDev() ? 'development' : 'production',
    base: '/',
    publicDir: 'public',
    cacheDir: 'node_modules/.vite',
    build: {
        // 设置最终构建的浏览器兼容目标
        target: 'es2015',

        // 输出目标
        outDir: 'dist',

        // 资源放置目录， 相对于 outDir
        assetsDir: 'assets',

        // https://github.com/vitejs/vite/pull/3317 该配置如果在使用 legacy 插件后会导致 css 丢失，目前稍微修复
        // cssCodeSplit: false,

        // 控制台现实 压缩报告
        brotliSize: true,

        //sourcemap
        sourcemap: isDev() ? true : false,

        // 压缩配置
        minify: 'terser',

        // 传递给 terser 的 options
        terserOptions: {
            compress: {
                drop_console: isDev() ? false : true,
                drop_debugger: isDev() ? false : true
            }
        },

        // chunk 大小警告的限制
        chunkSizeWarningLimit: 1500
    },
    plugins: [
        vue(),
        legacy({
            // not IE 11
            // targets: ['defaults', 'not IE 11']

            // 如果是 IE 11 ，还需要 regenerator-runtime
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime']
        }),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
        }),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    ensureStyleFile: true,
                    resolveStyle: name => {
                        name = name.slice(3)
                        return `element-plus/packages/theme-chalk/src/${name}.scss`
                    },
                    resolveComponent: name => {
                        return `element-plus/lib/${name}`
                    }
                }
            ]
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
        // 可以省略 导入时的后缀名 .mjs 是 vite 打包后的文件后缀 ，如果去除会导致 client 等文件无法访问
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    css: {
        preprocessorOptions: {
            scss: {
                //全局引入scss
                additionalData: `@import "./src/style/global.scss"; ` //scss文件路径
            }
        }
    },

    // 依赖预编译
    optimizeDeps: {
        // exclude: ['lodash-es']
    }
})
