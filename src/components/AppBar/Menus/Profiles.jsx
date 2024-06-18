import React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

const Profiles = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: '32px', height: '32px' }}
            alt="avatar"
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMREhUPEBIVEBAVEhgQFRYQFRUXFRgPFRcXFhUVFRUYHSggGB0lGxUYITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGhAQFy0lHyUtLS0tLS0tLS0tLS0tKy0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLTctNysrLSstK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAgMEBwEFBgj/xABFEAABAwICBQkDCQYFBQAAAAABAAIDBBEhMQUSE1FxBgcUIkFhgZGhMnKxQlJiY4KSorLwCCNzwcLhJUNTo9EWJDST0v/EABsBAQADAQEBAQAAAAAAAAAAAAABAwQCBQYH/8QAKBEBAQACAQMCBgIDAAAAAAAAAAECEQMEEiEFMSIyM0FhcUJRBhM0/9oADAMBAAIRAxEAPwC4kIQgmx5DgEpJjyHAJSCJUe0m05UZptA/S9vgpCj0vb4fzUhA1UZeKiqRWPAaXOIa0Ykk2AAzJJyVM8u+eAM1qfRlnvyNQQCwH6ppwf7xw7igsvTnKOloWiWrmbCMwDi93usGLvAKseUfPsTduj6a3ZtKr4iNh+J8FTtdWyTvM00jpZXZukJLj4n4KOg6rSvOLpSovr1kjGn5MFomgbhqAHzK5yprZZDeSWSQ75Hud8SmUIkpkhbi0lp3tJB9FudH8sK+A/ua2dg3GRzh919wtIhBZ+gOe2uhIbVMjq2dpsI5LXxN29Um3cFZ/JznLoNIFrGyGnnOGyqLNcT9B1y12XYb9y8woQeyk7TZ+C838iOdGpodWGoLqqkFhquP7xjfq3nMfRduwsvQPJrTMFZGKimkEkThmMw7C7XjNrhuKIblImyKWkTZFBDQhCCehCEEKXM8UlKlzPFJQCEIQTNkNyNkNyWhBDdIb5o2p3pLszxPxWEEmJtxc4lL2Q3JNP7KdQR5urlgm9qd6XVdn63KJVVDY2OlebMY0vcdzWi5PkEFT8/PKtzWs0ZE7F4Es9j/AJd/3cZ4kEngFSK2PKDSz6ypmq5L3lkc8A/JYT1GjuDbDwWvRIQhCAQhCAQhCAQhCAXW82/LF+jKkOJPRZCGTtGI1chIB85ufC4XJIQey2zkgEOuCLgjIg5EJxjySATcLguZzTRqtGxhxvJA40zr52bYsJ+w5o8Cu7h9oIhJ2Q3IMY3JawUEPanes7U702FlBKYwEAkYpWyG5EWQ4JaBGyG5YTiEEXpB7kdIPcmkIJDYAccccfNZ6OO9OR5DgEpBGc/V6oy71jpB7lio9pNoH2DXz7N367lxfPNU7DRNQWk60mpB4PeNb8Icu0pe3wXD8+tNr6IlcP8ALlik/wBwM/rQeZkIXQ8luSM+kGTOgLQ6HVwfcB5drdUO7CA3t39ii2T3TJtzyFJ0hQS07zFPG6KQZteLHiN47woykYQsoJQYui67Pkpzd1VbaR46NTnHXkB13DfGzt4mw4q1tE83+j4GhvR2zuti+oAe4ngeqPAKrLlxxWY8WWTztdC9G6Q5B6PmGqaWNh+dCNm4cC23rdVhy05tZaQGemJqKcYuFv3rBvcALOHePEJjy45GXFlHAoWUK1WuL9nSrvLV0xObGTgDe0ljj+JqvB0Qb1hmN688fs+yW0o8fOo5G/7kLv6V6Km9kogz0g9yOkHuTSEEno43n0R0cd6eQgjGUtwFrDBY6Qe5IlzPFJQO9IPchNIQPdHO9HRzvUlCBgT2wtlh5I6QNyYdmeJ+KwgfLNbrZLHRzvTlP7KdQRx1M8b/AK/mue5xI9toysjtcmmkcOLBrj8q6Cq7P1uUOthEkb4ziHxuYeDmkH4oPHQKvLmWodnQOlIxmnc8fw2hrG+rXHxVHvjLSWEdZpLSPpA2I816a5K6P6PR08GRZCwO98i7vUlUc91jpdwz4tn9L6Hgq2bKpibMz6QxHe1wxae8FV/pfmehcS6lqHw/RlG0aOBuHed1ZyFmxzyx9q0ZYTL3imBzO1N7dJh1d+q+/l/ddXyX5sKalc2adxq5mm41hqxtdvDL9bx8l3iF1ebKonFjPsEIQq1gQhCCiOdnk0KSpE0LNWCcF1hk2cYvaNwNw4DiuGXpblhoBtfSyUxsHnrRuPyZW4tPA4g9xK821NO+N7opGlkjHFjmnMOGBC28OfdGPlx7asLmDP8AihO6llP4owvRhl1urbNefv2fKcmtqJexlLqfakkYfhGVfkPtBWqi+jnejo/epKwUDPSBuR0gblGCygfMWt1t+Kx0c709FkOCWgjdHO9CkoQN7Zu/0KNs3f6FREIHDETiBgcexGxdu+Ckx5DgEpAzG8NFjgUrbN3+hTFR7SbQPS9b2cbfrtWrrpXB2re1h2d62tL2rXaZjs4O3i3iFVzb7fCzi13eVCcvOSHRa+GeNv8A21RUsv2hkzpAXt4G5I8R2K7CoGmdHNqIjE4drZGndJG4PYfMeV1OKzZZ90m2rHDttCEIVbsIQhAIQhAIQhAKseeXk/DsentYW1OuyIluT2m4Gs3tcN+eQVnKBpbRrajZB9iyOZs5B7SwEtH3rHwXeGXbduc8e6aaXm85LDR9Pj/5Moa6Y3yIvqsHc258bqwqAkta85b+FwtMt/DHqxBvd65q7hyuWVtUc0kxkPbZu/0KDM3f6FRELSzl7F274I2Lt3wUxCBpkgAsTiFnbN3+hUaXM8UlBL2zd/oUKIhBnVRqqchAhhwHBK1goT8zxPxWEDs4xTeqpNN7KdQR6bC90VkQe0t7cxxWKrs/W5MqLNzSZdNO9pBIOYSVt30wfhkbYFaki2BzGHisXJx9rZx5zKMIQhVrAhCEAhCEAhCEAhCmUlKHN1nb7BdY43K6jnLKYzdY0fTa7rn2Rnx3LdSHqlQ2tAwAsE5D7QW3jw7Zpjzz7qTqlGqpywV24GsEayghCBcoxPFJ1SpcWQ4JaCDZCnIQCFC1zvPmjXO8+aDDszxPxWFLYwWGAy3JWoNw8kCKf2U6osxsbDAdyRrnefNA5Vdn63JlP0+N748cU9sxuHkgj0+fgoGlqex1xkc/eWzmFhcYHuUWQawIJJBXHJj3TTvDLtu2mQlyxlpsUhYLNXTbLsIQhEhCEIBCEIFRMLiGjM4LeviDWNaMh/woFDDbr9py4LYQYnHHDtWvhw1NsnNnu6MpcPtBStQbh5JEjQASBY9yvUnVgqHrnefNGud580CAsqbsxuHkjUG4eSDEWQ4JahyOIJAJAWNc7z5oJqFC1zvPmhAlClbAI2AQLjyHAJSimYjAdmCNuUGKj2k2pDGawuc0rYBAil7fBSFHkOrl2pG3KB6oy8VFTzHaxscs05sAg11awFpJzAJ8lq2OBFxkt7pCECJ5+g74LkIpS3LyWPqPFjZ083K2aE3FMHZZ7k4qFoQhF1IE9RNDnEH5IuVr56rsb5qbyZaC599w+JXXHq5yOeSWYWtunabPwTuwCTINXEcF6DAfSJsio+3KU2Qk2ORQMoUrYBGwCB1Cibco25QJlzPFJUlsQIuczis7AIIqFK2AQgdQo/Se71R0nu9UDLszxPxWE+IL43zxy3o6N3+iBdP7KdUfaanVzR0nu9UGKrs/W5Mp5x1sT1QN+S0Wk+VVDT3EtXEHD5LDru+6y5RFum8p/a8FJc4DE4BVlXc7lLHfo8UtQcgXWib5m7h91PcmeXD9JbRr42wlhDg1ji67HXxJIF7Ebty67b7omUt06rSWkNfqNwZ8f7LRTx6p7lNSZGXFlRy8ffGjh5OzL8ICfjqnDPHimXCxsVhef7PR8VJNYdwTL5S7MpCE2akAWyoXmIhzc+3/AIUali+UfBSVs4OPXxVi6jl38MdJR1bZBcYEZjd/ZKqshxXMOq9iDKTqhjS8n6IFyuPouePWwqKSwz1oJLn7jwPzeC1TG32Y7lJ7rPS4faC5LR3OJo6bA1BhdunY5o+9i31XU0dTFINpDKyZuf7tzXDzBKWWJllbBYKY6T3eqDUd3qoSjhZT/Ru/0R0bv9EDsWQ4Jaj7bV6tr2wR0nu9UEhCj9J7vVCBhCc2BRsCgkx5DgEPeALk2AxJOVlC0jpSKmidNM8Mjjbdzj5WG837FQnLrl/PpBxjjJho72DBg54BwdKe33ch3rrHG1zllIsXlRzo0lO5zIL1cgwOzNowe+Q+19m64DSXOnXy3EZjp2/Vs1nD7T7/AAXDhCtmEii52p2kNM1NRfb1E0t+x8ji37t7DwChxC2WCSlR5rtydXRcgdIbGtjubNkvC77Xs/iAXOrLXEG4NiDcEdhGRSzcJdXb0MhQ9EVwqII5x8tgdwPaPO6mLK1mamK4uMx8FEWxUSpisbjI/FZOo4/5Rs6fl/jTKchj1j3JsC+CnxMsLKvh4+6/hbz8nZNT3KCyhC3vOcrzkaQ2VG5gNnTOEQ932n+gt4qoV2XOhpDaVLYQerCzH+I/rH01Vxq0YTUZs7usPySIJnMOtG50bt7HFp8wlvyTK6cum0Zy+0hBYNqXSgdlRaT8Tut6rr9Cc75uG1lOLdr6cnzMbj8CqqQubjK6mdj1ToLT1PWR7WmlbK3ttcOadzmnFp4hbK68n6L0nLTSCenkdFIO1vaNzhk4dxV88gOX8ekG7KUCKsaLuYL6r2i13x9tscRmO/NVZYWLcc9urlzPFJTroycRkVjYFcLDaE5sChBLSXuABJwAFyTuRtBvHmq954+UvR6XosTrS1ILDY4inGEh8b6viVMm6i3U2rnnK5XGvnMcRtSROIYOx772Mh/l3cVxqELRJpmt35CEIUoCVHmkpUeaB1CEIhaHNZpDXgfTk4xP1h7j8fiD5rt1TnN9pDY1rATZsoMB3XdYtP3gPNXGqM5qtHHdxlJeAQb5frFORxlxsFUXLblLUSyyUrgYIo3ujLBm4tNrvd2g5gDDHtVHLnMcfL0Oi6TPqM9Y3Wll6Kq4pQ50UrJdVxYdQg2I3rYKgtG6Qlp3iWF5jeMLjIjcRkR3FXRyU0jJV0ral8ezJcW9U3Dg0212jsF7+Sq4OSWdsjV6j6flwfHvcbVImlDGue7BrWlx91oufQJS5jnF0hsaNzQbOlIiHunF/wCEHzWqTdeRbqKn0jVmaWSZ2ckjpOGsbgeAsPBR0IWlkYfkmU8/JMoBCEIkJ6kqXxPbLE4skY4Pa5uYcO0JlCgel+QPKhukaVsuDZmfu5mDskHaO4jELpV5t5tuURoa1jnG0EpEMo7A1xs159048CV6PDxvHmFRlNVowy3C0JO0G8eaFy7Ql525w9L9Kr5ng3jjdsI/dj6pPi7WPiNyvrT9d0emnqP9OF8g95rSR62XmG5zOJzPHerOOfdVy37BCEK5SEIQgFkGywhA4JEtNMCdRBUchaQ5ps5pDgdzgbg+a9BaDkFTDHUDBsjA/wASMR53C89q4eZ/SWvSvpietDJcD6uQl35tZV8k8bW8V86d4xgAsMFTnO/SsZWNe3B8kIc8d4JaHeIHorlVI868+vpBw+ZFHH8Xf1LD1PyPe9FlvU+P6rjnZL0roulZDDHFFhGxjWt90DPxz8V5qK9GcmKna0lPJ86Bh8dUD+Sq6X3rd69L2YX7eUqelBxbgfRU9zp12vUtp+yFmP8AEksT+EN81c80oY0vcbNa0uJ3NAuT6LzfpeuNRPLUOzkkc/7JPVHgLDwXo8c8vleW+NIaw51llJkCuUEuf2JCEIkIQhAIQhAL0byC0t0uggmJu8N2T/4kfUJ8bA+K85K3uY2uvFU05+RIyUcJA5pt4x+qrznh3x3ys9CEKlocvzw1oi0ZI3AGV7IB4nWd+FjvJeelb/P3W9Wlp973zn7IDB+d3qqgV3HPDPyXyEIQrHAQhCAQhCIORJaaabJ1ALrua/Sewr2MJsyZpgPvHFn4hb7S5FOQTFjmyNwcxwe33mkOHqFFm4mXVem1575aVG0r6p317mf+vqf0q+dHVzZoI6hvsvjEvmLkedx4LzjWzbSR8nz5HP8AvOJ/mvM6q+JH1PoOO88svwZV682NRr6Oh3tL4/J5t6EKilcHM3UXpZYz8ie4917Gn4gqrpr8bf61hvp9/wBVs+c7SWwoJGg9aYinHuuvr/hB81Ri7/nh0nr1MdMDhCzWcPrJLH8ob5rgF62E1HxPJd0IQkSHsXbg2hCESEIQgEIQgFZHMXU6tbNF/qU+t4xvH/2q3XXc1FTs9KU+5+vF95jreoC5y9nWPu9GWHchZshZml58546/a6RLL3EMLI+DjeQ/nC4dbXlXWbetqZsw6d9vdadRvo0LVLVJqMuV3QhCFKAhCEAhCEQE7GU0stNkDyEIQWryD05/hVSwnr0zJCPcka5zPxBw8FVTQthovSjoWTxj2Z4dieOsCD5aw+0oC8rrfnfYf49J/pyv5YVk8zdWGuqmONm7Nkx4NLg4+AIVbLYaJ0m6nE2re81O6nuDkHuYSfJp81RwfUj0fVJvpc/0TpvSBqaiWoOckhf9nJo+6APBQUIXuPz4FMkpchTaAQhCJCEIQCEIQC2XJqq2NZTSj5NRGT7uuA70JWtWQ4jrDMYjiMQlI9Za7t/oELgf+tovnoVXau71GPzPFJQhWqQhCEAhCEAhCEQFkIQgcZkEpCEGQhYQvM675o+u/wAd+ln+whCFR031Y9L1b/kz/TKwhC9p+fmn5pKEIkIQhAIQhAIQhAIQhBJQhChL/9k="/>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        aria-labelledby="basic-button-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem>
          <Avatar sx={{ width: '28px', height: '28px', mr: 2 }}/> Profile
        </MenuItem>
        <MenuItem>
          <Avatar sx={{ width: '28px', height: '28px', mr: 2 }}/> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles

