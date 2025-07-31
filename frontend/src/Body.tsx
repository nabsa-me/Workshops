import { Box, Button, Typography } from '@mui/material'

export const Body = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '320px',
        maxWidth: '800px',
        padding: { xxs: '5rem 2rem', md: '8rem 5rem' }
      }}
    >
      <Typography variant='hero'>Borderlands Quest:</Typography>
      <Typography variant='h1' sx={{ mb: '2rem' }}>
        Goblin Trouble
      </Typography>
      <Typography variant='h2'>A short adventure for four to six level 1 characters</Typography>
      <Typography variant='body1'>
        Borderlands Quest: Goblin Trouble is a Dungeons & Dragons adventure that introduces four to six new players to
        the game and teaches you, the Dungeon Master, how to run it for them. This short adventure is meant to last
        approximately 1-2 hours of play.
      </Typography>
      <Button variant='CTA' sx={{ alignSelf: 'center', mt: '3rem' }}>
        Play Now!
      </Button>
    </Box>
  )
}
