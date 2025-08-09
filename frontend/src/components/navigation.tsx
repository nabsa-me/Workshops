import {
  AppBar,
  Fade,
  IconButton,
  IconButtonProps,
  List,
  ListItem,
  Modal,
  Paper,
  styled,
  Toolbar,
  Typography,
  TypographyProps,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { colors, quickTransition, softTransition } from '../styles/styles-constants'
import { Close, Menu, PlayCircleOutline } from '@mui/icons-material'
import { useEffect, useState } from 'react'

const NavBarIconButton = styled((props: IconButtonProps) => <IconButton {...props} />)(() => ({
  color: colors.grey2,
  transition: softTransition,
  '&:hover': {
    filter: 'drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.6))'
  },
  '&:active': {
    transition: quickTransition,
    filter: 'drop-shadow(0px 0px 10px rgb(0, 0, 0, 0.4))',
    color: colors.grey3
  }
}))

const NavBarItemTypography = styled((props: TypographyProps) => <Typography {...props} variant='h2' />)(
  ({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5rem !important',
      margin: '0.5rem 0 0 0'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '0.95rem !important',
      margin: '0'
    },
    transition: softTransition,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      textShadow: '0px 0px 2px rgba(255, 255, 255, 0.6)',
      cursor: 'pointer'
    },
    '&:active': {
      transition: quickTransition,
      textShadow: '0px 0px 10px rgb(0, 0, 0, 0.4)'
    }
  })
)

const NavBarItems = ({ item, isSmallScreen }: { item: string; isSmallScreen: Boolean }) => {
  return (
    <ListItem key={item} sx={{ paddingRight: '0', justifyContent: 'center' }}>
      <NavBarIconButton>
        <NavBarItemTypography>
          {item}
          {isSmallScreen && <PlayCircleOutline sx={{ marginLeft: '0.75rem' }} />}
        </NavBarItemTypography>
      </NavBarIconButton>
    </ListItem>
  )
}

export function PrimaryNavBar({ navItems }: { navItems: string[] }) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  useEffect(() => {
    if (!isSmallScreen) {
      setMenuIsOpen(false)
    }
  }, [isSmallScreen])

  return (
    <>
      {isSmallScreen && (
        <Modal
          open={menuIsOpen}
          onClose={() => setMenuIsOpen(false)}
          sx={{
            height: '100%',
            overflowY: 'scroll',
            top: '64px'
          }}
          hideBackdrop
          closeAfterTransition
        >
          <Fade in={menuIsOpen} timeout={500}>
            <Paper
              sx={{
                display: 'flex',
                height: '100%',
                width: '100%',
                backdropFilter: 'blur(25px) brightness(0.75)',
                maskImage: 'linear-gradient(to top, black 80%, transparent 150%)',
                background: 'transparent'
              }}
            >
              <List sx={{ width: '100%', marginTop: '30%' }}>
                {navItems.map((item) => (
                  <NavBarItems item={item} key={item} isSmallScreen={isSmallScreen} />
                ))}
              </List>
            </Paper>
          </Fade>
        </Modal>
      )}
      <AppBar
        position='sticky'
        elevation={5}
        sx={{
          backdropFilter: 'blur(10px)',
          background: `linear-gradient(to right, ${colors.black1} 5%, ${colors.black2} 20%, transparent 125%)`,
          borderBottom: `1px solid${colors.black4}`,
          zIndex: 10
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Typography variant='logo'>DrAkiA</Typography>
          {isSmallScreen ? (
            <>
              <NavBarIconButton
                onClick={() => setMenuIsOpen(!menuIsOpen)}
                sx={{
                  scale: '1.3',
                  marginRight: '0.5rem'
                }}
              >
                <Fade in={!menuIsOpen} timeout={500}>
                  <Menu sx={{ position: 'absolute' }} />
                </Fade>
                <Fade in={menuIsOpen} timeout={500}>
                  <Close sx={{ position: 'absolute' }} />
                </Fade>
              </NavBarIconButton>
            </>
          ) : (
            <List sx={{ display: 'flex' }}>
              {navItems.map((item) => (
                <NavBarItems item={item} key={item} isSmallScreen={isSmallScreen} />
              ))}
            </List>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}
