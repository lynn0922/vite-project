/*
 * @Author: lynn
 * @Date: 2021-07-12 00:05:55
 * @LastEditTime: 2021-07-12 00:12:32
 * @LastEditors: lynn
 * @Description:
 */
import { defineComponent, PropType } from 'vue'
import { Person } from '@/components/HelloWorld'

export default defineComponent({
    name: 'Item',
    props: {
        item: {
            type: Object as PropType<Person>,
            required: true
        },
        index: {
            type: Number as PropType<number>,
            required: true
        },
        onDelete: {
            type: Function as PropType<(index: number) => void>,
            required: true
        }
    },
    setup(props) {
        const handleClick = (): void => {
            const { item, onDelete, index } = props
            if (item.isComplete) return
            onDelete(index)
        }

        return () => {
            const { item } = props

            return (
                <div style={'display: flex; align-items: center;justify-content: center;'}>
                    <div>{item?.id}</div>
                    <div style={'padding: 0 20px'}>{item?.name}</div>
                    <el-button type="text" onClick={handleClick}>
                        {item.isComplete ? 'Complate' : 'Delete'}
                    </el-button>
                </div>
            )
        }
    }
})
