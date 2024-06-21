import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

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

  const [activeDragItemId, setActiveDragItemId] = useState(null) // id của ptu đang kéo
  const [activeDragItemType, setActiveDragItemType] = useState(null) // check xem card hay column đang được kéo
  const [activeDragItemData, setActiveDragItemData] = useState(null) // data của ptu đang kéo
  // data cũ khi kéo/thả card
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    // dùng cards thay vì carOrderIds bởi vì bước handleDragOver chúng ta sẽ làm data cho cards
    // hoàn chỉnh trước rồi mới tạo ra carOrderIds mới
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  // cập nhật lại state trong trường hợp di chuyển Card giữa các column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      // tìm vị trí index của overCard trong column đích(nơi activeCard sắp đc thả)
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      // console.log('overCardIndex', overCardIndex)

      // logic tính toán cho 'cardIndex mới'(trên hoặc dưới overCard)
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // console.log('newCardIndex', newCardIndex)
      // console.log('isBelowOverItem', isBelowOverItem)
      // console.log('modifier', modifier)

      // clone mảng orderedColumnsState cũ ra 1 cái mới để xử lí rồi cập nhật lại orderedColumnsState mới
      const nextColumns = cloneDeep(prevColumns)

      // clone activeColumn, overColumn ra 2 biến mới(ko đụng chạm gì đến dữ liệu của 2 thằng này ở trên)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      if (nextActiveColumn) {
        // xóa card ở cái column active(column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // xóa xong thì cập nhật lại mảng cardOrderIds cho chuẩn data
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      if (nextOverColumn) {
        // kiểm tra xem card đang kéo có tồn tại ở overColumn chưa, nếu có thì xóa đi
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Phải cập nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card giữa 2 column khác nhau
        const rebuildActiveDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        // thêm card đang kéo vào overColumn theo vị trí mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuildActiveDraggingCardData)
        // xóa xong thì cập nhật lại mảng cardOrderIds cho chuẩn data
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      // console.log('nextColumns', nextColumns)
      return nextColumns
    })
  }

  // trigger bắt đầu kéo 1 ptu(drag)
  const handleDragStart = (event) => {
    // console.log('handleDragStart', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ?
      ACTIVE_DRAG_ITEM_TYPE.CARD :
      ACTIVE_DRAG_ITEM_TYPE.COLUMN
    ) // nếu ptu đang kéo có columnId thì nó là card, ko thì là column
    setActiveDragItemData(event?.active?.data?.current)

    // nếu là kéo card thì mới thực hiện hành động set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // trigger trong quá trình kéo(drag) 1 ptu
  const handleDragOver = (event) => {
    // ko làm gì khi kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // console.log('handleDragOver', event)

    // kéo card => xử lý thêm kéo card giữa các column
    const { active, over } = event

    // ko tồn tại 1 trong 2(kéo ra ngoài phạm vi container) thì ko làm gì, tránh crash trang
    if (!active || !over) return

    /**
     * activeDraggingCardId: là card đang được kéo
     * overCardId: là card đang tương tác trên hoặc dưới so với card đang đc kéo
     */
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over
    // console.log('over', overCardId)

    // tìm column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // xử lí kéo card qua lại giữa 2 column khác nhau còn nếu kéo card trong cùng column thì ko làm gì
    // vì đây đang xử lí lúc kéo(dragover) còn xử lí lúc kéo xong thì nó là vấn đề khác ở (dragend)
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  // trigger kết thúc kéo 1 ptu(drop)
  const handleDragEnd = (event) => {
    // console.log(event)
    // active là phần tử mình kéo
    // over là phần tử đánh dấu điểm kết thúc của phần tử kéo
    const { active, over } = event
    // ko tồn tại 1 trong 2(kéo ra ngoài phạm vi container) thì ko làm gì, tránh crash trang
    if (!active || !over) return

    // xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      /**
       * activeDraggingCardId: là card đang được kéo
       * overCardId: là card đang tương tác trên hoặc dưới so với card đang đc kéo
       */
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over
      // console.log('over', overCardId)

      // tìm column theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      // khi đi qua onDragOver tới đây là state của card đã bị cập nhật 1 lần rồi
      // nên ko thể lấy activeColumn để so sánh được (nó sẽ luôn là kéo card trong cùng column)
      // nên phải dùng activeDragItemData.columnId hoặc oldColumnWhenDraggingCard để lấy ra column ban đầu của card đang active
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
      // if (activeDragItemData.columnId !== overColumn._id) {
        // kéo thả card giữa 2 column khác nhau
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // kéo thả card trong cùng column
        // lấy vị trí cũ (từ oldColumnWhenDraggingCard)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(card => card._id === activeDragItemId)
        // lấy vị trí mới (từ over)
        const newCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        // Dùng arrayMove tương tự với kéo column trong board content
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        setOrderedColumns(prevColumns => {
          // clone mảng orderedColumnsState cũ ra 1 cái mới để xử lí rồi cập nhật lại orderedColumnsState mới
          const nextColumns = cloneDeep(prevColumns)

          // Tìm tới column đang thả
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          // cập nhật lại 2 giá trị mới là card và cardOrderIds trong cái targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          // trả về giá trị state mới
          return nextColumns
        })
      }
    }

    // xử lý kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // kiểm tra tồn tại vị trí kéo thả khác vs vị trí ban đầu
      if (active.id !== over.id) {
        // lấy vị trí cũ (từ active)
        const oldColumnIndex = orderedColumns.findIndex(column => column._id === active.id)
        // lấy vị trí mới (từ over)
        const newColumnIndex = orderedColumns.findIndex(column => column._id === over.id)

        // mảng sau khi kéo thả. Dùng arrayMove để sắp xếp lại mảng Columns ban đầu
        // VD [1,2,3,4,5,6,7] => Dùng arrayMove với oldIndex = 1(a[1]) và newIndex = 5(a[5])
        // output: [1,3,4,5,6,2,7]
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // console.log(dndOrderedColumns)

        // lưu lại mảng ids => update lại db chẳng hạn => để tránh việc f5 lại các column về như ban đầu
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        // console.log(dndOrderedColumnsIds)

        // cập nhật lại column khi kéo thả xong
        setOrderedColumns(dndOrderedColumns)
      }
    }

    // dữ liệu sau khi kéo thả thì đưa về null mặc định ban đầu
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  return (
    <DndContext
      sensors={sensors}
      /**
       * thuật toán phát hiện va chạm(nêu k có thì card với cover lớn sẽ k kéo qua Column được)
       * vì lúc này nó đang bị conflict giữa card và column, dùng closestCorners thay vì closestCenter
       */
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx = {{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
