/*
 * @Author: lynn
 * @Date: 2021-07-12 00:05:40
 * @LastEditTime: 2021-07-12 00:07:05
 * @LastEditors: lynn
 * @Description:
 */
import { defineComponent, PropType } from 'vue'
import Item from './Item'
import { Person } from '@/components/HelloWorld'

export default defineComponent({
    name: 'TodoList',
    props: {
        list: {
            type: Array as PropType<Person[]>
        },
        onDelete: {
            type: Function as PropType<(index: number) => void>,
            required: true
        }
    },
    setup(props) {
        return () => {
            const { list, onDelete } = props
            return (
                <>
                    {list?.map((item, index) => {
                        return <Item item={item} index={index} onDelete={onDelete} key={item.id} />
                    })}
                </>
            )
        }
    }
})
