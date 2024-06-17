import Box from '@mui/material/Box'

const BroadContent = () => {
  return (
    <Box sx = {{
      backgroundColor: 'primary.main',
      width: '100%',
      height: (theme) => `calc(100vh - ${theme.trello.broadBarHeight} - ${theme.trello.appBarHeight})`,
      display: 'flex',
      alignItems: 'center'
    }}>
    broad content
    </Box>
  )
}

export default BroadContent
