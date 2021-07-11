import { defineComponent, ref, withModifiers, reactive } from 'vue'
import { debounce } from 'lodash-es'
import TodoHeader from '@/components/TodoHeader'
import TodoList from '@/components/TodoList'

export interface Person {
    id: number
    name: string
    // isSelected: boolean
    isComplete: boolean
}

const HelloWorld = defineComponent({
    props: {
        msg: {
            type: String
        }
    },
    setup(props) {
        const count = ref(0)
        const value1 = ref([new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)])

        const data: Person[] = reactive([
            { id: 10, name: 'sheep', isComplete: false },
            { id: 20, name: 'Tom', isComplete: true },
            { id: 30, name: 'Jocky', isComplete: false }
        ])

        const inc = (e: any) => {
            console.log(e)
            console.log(count.value)
            count.value++
        }

        const btn = debounce(() => {
            console.log('....')
        }, 1200)

        const radomTrueOrFalse = (): boolean => {
            const mathRadomNum = Math.random()
            return mathRadomNum > 0.5 ? true : false
        }

        const addItem = (v: string): void => {
            const item = {} as Person
            if (v) {
                const nextLastNum: number = data[data.length - 1].id + 10
                item.id = nextLastNum
                item.name = v
                item.isComplete = radomTrueOrFalse()
            }
            data.push(item)
        }

        const remove = (index: number): void => {
            data.splice(index, 1)
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

                <TodoHeader onAdd={addItem} />
                <div style={'margin-top: 20px'}>
                    <TodoList list={data} onDelete={remove} />
                </div>
            </>
        )
    }
})
export default HelloWorld
