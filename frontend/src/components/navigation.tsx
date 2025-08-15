import {
  AppBar,
  Box,
  Fade,
  IconButton,
  IconButtonProps,
  List,
  ListItem,
  Modal,
  Paper,
  styled,
  Theme,
  Toolbar,
  Typography,
  TypographyProps,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { colors, quickTransition, softTransition } from '../styles/styles-constants'
import { Close, Menu, PlayCircleOutline } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { NavBarItemsProps, NavModalProps, PrimaryNavBarProps, SecondaryNavBarProps, SiteMap } from '../types/navigation'

const siteMap: SiteMap[] = [
  { label: 'Tools', items: ['Loots', 'Character', 'Encounter', 'Homebrew', 'Glossary'] },
  { label: 'Player', items: ['Classes', 'Species', 'Backgrounds', 'Feats'] },
  { label: 'Rules', items: ['Monsters', 'Spells', 'Items'] },
  { label: 'Sources', items: ['Adventures', 'Books'] }
]

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
      fontSize: '1.5rem !important'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '0.95rem !important'
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

const NavBarItems = ({ item, isSmallScreen, setActiveItem }: NavBarItemsProps) => {
  return (
    <ListItem key={item} sx={{ paddingRight: '0', justifyContent: 'center' }}>
      <NavBarIconButton
        onMouseEnter={() => !isSmallScreen && setActiveItem(item)}
        onClick={() => isSmallScreen && setActiveItem(item)}
      >
        <NavBarItemTypography>
          {item}
          {isSmallScreen && <PlayCircleOutline sx={{ marginLeft: '0.75rem' }} />}
        </NavBarItemTypography>
      </NavBarIconButton>
    </ListItem>
  )
}

function SecondaryNavBarItems({ item }: { item: string }) {
  return (
    <Fade in={!!item} timeout={500}>
      <ListItem key={item} sx={{ paddingRight: '0', justifyContent: 'center' }}>
        <NavBarItemTypography sx={{ scale: '0.85' }}>{item}</NavBarItemTypography>
      </ListItem>
    </Fade>
  )
}

function NavModal({ menuIsOpen, setMenuIsOpen, isSmallScreen, setActiveItem }: NavModalProps) {
  return (
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
            {siteMap.map(({ label }: SiteMap) => (
              <NavBarItems item={label} key={label} isSmallScreen={isSmallScreen} setActiveItem={setActiveItem} />
            ))}
          </List>
        </Paper>
      </Fade>
    </Modal>
  )
}

function PrimaryNavBar({ isSmallScreen, setMenuIsOpen, menuIsOpen, setActiveItem }: PrimaryNavBarProps) {
  return (
    <AppBar
      position='sticky'
      elevation={5}
      sx={{
        backdropFilter: 'blur(10px)',
        background: `linear-gradient(to right, ${colors.black1} 5%, ${colors.black2} 20%, transparent 125%)`,
        borderBottom: `1px solid${colors.black4}`,
        zIndex: 10,
        height: '64px'
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
        ) : (
          <List sx={{ display: 'flex' }}>
            {siteMap.map(({ label }: SiteMap) => (
              <NavBarItems item={label} key={label} isSmallScreen={isSmallScreen} setActiveItem={setActiveItem} />
            ))}
          </List>
        )}
      </Toolbar>
    </AppBar>
  )
}

function SecondaryNavBar({ activeItem }: SecondaryNavBarProps) {
  return (
    <AppBar
      position='absolute'
      elevation={2}
      sx={{
        backdropFilter: 'blur(10px)',
        background: `linear-gradient(to right, ${colors.black3}50 0%, ${colors.grey4}30 80%)`,
        borderBottom: `1px solid${colors.black4}50`,
        zIndex: 5,
        height: '50px',
        top: activeItem ? '64px' : '0',
        opacity: activeItem ? 1 : 0,
        transition: softTransition
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
          minHeight: '50px !important'
        }}
      >
        <List
          sx={{
            display: 'flex',
            padding: '0 !important',
            alignItems: 'center',
            height: '100%'
          }}
        >
          {siteMap
            .find((item: SiteMap) => item.label === activeItem)
            ?.items.map((item: string) => (
              <SecondaryNavBarItems item={item} key={item} />
            ))}
        </List>
      </Toolbar>
    </AppBar>
  )
}

export function AppNavigation() {
  const theme: Theme = useTheme()
  const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('md'))
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<string>('')

  useEffect(() => {
    if (!isSmallScreen) setMenuIsOpen(false)
  }, [isSmallScreen])

  useEffect(() => {
    if (!menuIsOpen) setActiveItem('')
  }, [menuIsOpen])

  return (
    <>
      <Box onMouseLeave={() => !isSmallScreen && setActiveItem('')}>
        <PrimaryNavBar
          menuIsOpen={menuIsOpen}
          setMenuIsOpen={setMenuIsOpen}
          isSmallScreen={isSmallScreen}
          setActiveItem={setActiveItem}
        />
        {isSmallScreen ? (
          <NavModal
            menuIsOpen={menuIsOpen}
            setMenuIsOpen={setMenuIsOpen}
            isSmallScreen={isSmallScreen}
            setActiveItem={setActiveItem}
          />
        ) : (
          <SecondaryNavBar activeItem={activeItem} />
        )}
      </Box>
    </>
  )
}
