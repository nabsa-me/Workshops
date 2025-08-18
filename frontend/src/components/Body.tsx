import { Box } from '@mui/material'
import { CTAButton } from './common/buttons'
import { GradientTitle, HeroSubtitle, HeroTitle, TextBody } from './common/typography'

export function Body() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '320px',
        maxWidth: '800px',
        padding: { xxs: '5rem 2rem', md: '10rem 5rem 6rem 5rem' }
      }}
    >
      <HeroTitle>Borderlands Quest:</HeroTitle>
      <HeroSubtitle sx={{ mb: '2rem' }}>Goblin Trouble</HeroSubtitle>
      <GradientTitle>A short adventure for four to six level 1 characters</GradientTitle>
      <TextBody>
        Borderlands Quest: Goblin Trouble is a Dungeons & Dragons adventure that introduces four to six new players to
        the game and teaches you, the Dungeon Master, how to run it for them. This short adventure is meant to last
        approximately 1-2 hours of play.
      </TextBody>
      <CTAButton sx={{ alignSelf: 'center', mt: '3rem' }}>Play Now!</CTAButton>
    </Box>
  )
}
