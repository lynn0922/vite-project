import { defineComponent, ref, withModifiers, withKeys } from 'vue'
import { debounce } from 'lodash-es'

const HelloWorld = defineComponent({
    props: {
        msg: {
            type: String
        }
    },
    setup(props) {
        const count = ref(0)
        const inputVal = ref('')
        const value1 = ref([new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)])

        const inc = (e: any) => {
            console.log(e)
            console.log(count.value)
            count.value++
        }

        const btn = debounce(() => {
            console.log('....')
        }, 1200)

        const inputChange = () => {
            console.log('输入框value：', inputVal.value)
        }

        return () => (
            <>
                <h1>{props.msg}</h1>
                <el-time-picker
                    is-range
                    v-model={value1.value}
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                    style={'margin-right: 10px'}
                ></el-time-picker>

                {/* withModifiers jsx 中使用修饰符 stop ， prevent，ctrl，shift，alt，meta，left，middle，right，exact */}
                <el-button type="primary" onClick={withModifiers(inc, ['stop'])}>
                    count is {count.value}
                </el-button>

                <el-button type="primary" icon="el-icon-search" onClick={btn}>
                    搜索
                </el-button>

                <div style={'margin-top: 20px'}>
                    <el-input
                        style={'width: 200px; margin-right: 20px'}
                        v-model={inputVal.value}
                        onKeyup={withKeys(inputChange, ['enter'])}
                    />

                    <el-button type="primary" onClick={withModifiers(inputChange, ['stop'])}>
                        获取数据
                    </el-button>
                </div>
            </>
        )
    }
})
export default HelloWorld
