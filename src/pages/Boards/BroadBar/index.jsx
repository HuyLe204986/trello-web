import Box from '@mui/material/Box'

const BroadBar = () => {
  return (
    <Box sx={{
      backgroundColor: 'primary.dark',
      width: '100%',
      height: (theme) => theme.trello.broadBarHeight,
      display: 'flex',
      alignItems: 'center'
    }}>
      Broad bar
    </Box>
  )
}

export default BroadBar
