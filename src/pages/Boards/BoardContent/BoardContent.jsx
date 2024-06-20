import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

const BoardContent = ({ board }) => {
  // nếu dùng pointerSensor mặc định thì phải kết hợp thuộc tính css touchAction: none ở những phần tử
  // kéo thả- nhưng vẫn còn bug ở mobile
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10
  //   }
  // })

  // yêu cầu chuột di chuyển 10px thì mới kích hoạt event handleDragEnd, fix trường hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  // nhấn giữ 250ms và dung sai của cảm ứng 500px thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500
    }
  })
  // ưu tiên sử dụng kết hợp cả 2 loại sensor là mouse và touch để có trải nghiệm trên mobile tốt nhất
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    // console.log(event)
    const { active, over } = event
    // kiểm tra nếu kéo linh tinh ra ngoài
    if (!over) return

    // kiểm tra tồn tại vị trí kéo thả khác vs vị trí ban đầu
    if (active.id !== over.id) {
      // active là phần tử mình kéo
      // over là phần tử đánh dấu điểm kết thúc của phần tử kéo

      // lấy vị trí cũ (từ active)
      const oldIndex = orderedColumns.findIndex(column => column._id === active.id)
      // lấy vị trí mới (từ over)
      const newIndex = orderedColumns.findIndex(column => column._id === over.id)

      // mảng sau khi kéo thả. Dùng arrayMove để sắp xếp lại mảng Columns ban đầu
      // VD [1,2,3,4,5,6,7] => Dùng arrayMove với oldIndex = 1(a[1]) và newIndex = 5(a[5])
      // output: [1,3,4,5,6,2,7]
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // console.log(dndOrderedColumns)

      // lưu lại mảng ids => update lại db chẳng hạn => để tránh việc f5 lại các column về như ban đầu
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log(dndOrderedColumnsIds)

      // cập nhật lại column khi kéo thả xong
      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx = {{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent
