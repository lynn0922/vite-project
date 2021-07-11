/*
 * @Author: lynn
 * @Date: 2021-07-11 23:57:16
 * @LastEditTime: 2021-07-12 00:16:12
 * @LastEditors: lynn
 * @Description:
 */
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
    name: 'TodoHeader',
    props: {
        onAdd: {
            type: Function as PropType<(v: string) => void>,
            required: true
        }
    },
    setup(props) {
        const refInputValue = ref('')

        const addItem = (): void => {
            const value: string = refInputValue.value
            if (!value.trim()) return
            props.onAdd(refInputValue.value)
            refInputValue.value = ''
        }

        const handleKeyUp = (e: KeyboardEvent): void => {
            if (e.key === 'Enter') addItem()
        }

        return () => {
            return (
                <div style={'margin-top: 20px'}>
                    <el-input
                        style={'width: 200px; margin-right: 20px'}
                        v-model={refInputValue.value}
                        onKeyup={handleKeyUp}
                        placeholder="输入人名"
                    />
                    <el-button type="primary" onClick={addItem}>
                        添加
                    </el-button>
                </div>
            )
        }
    }
})
