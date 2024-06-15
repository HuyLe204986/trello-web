import Button from '@mui/material/Button'
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20'
import BackHandIcon from '@mui/icons-material/BackHand'
import HomeIcon from '@mui/icons-material/Home'
import { pink } from '@mui/material/colors'
function App() {
  return (
    <>
      <div>abc</div>
      <Button variant="contained">Hello world</Button>
      <BatteryCharging20Icon></BatteryCharging20Icon>
      <BackHandIcon></BackHandIcon>

      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[100] }} />
    </>
  )
}

export default App
