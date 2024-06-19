import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BroadBar from './BroadBar/BroadBar'
import BroadContent from './BroadContent/BroadContent'


const Board = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BroadBar />
      <BroadContent />
    </Container>
  )
}

export default Board
