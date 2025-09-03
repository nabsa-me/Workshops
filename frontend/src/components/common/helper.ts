import { Theme } from '@mui/material'
import { MonstersOptions } from '../../types/selectors'

export const getInputProps = (theme: Theme) => {
  const INPUT_TEXT_COLOR = theme.palette.negative[200]
  const FONT_FAMILY = "'Montaga', serif"

  return {
    BORDER_IDLE: `1px solid ${theme.palette.negative[400]}`,
    BORDER_HOVER: `1px solid ${theme.palette.negative[300]}99`,
    BORDER_FOCUS_HOVER: `1px solid ${theme.palette.negative[300]}`,
    BORDER_FOCUS: `1px solid ${theme.palette.negative[300]}99`,
    FONT_FAMILY,
    PLACEHOLDER_COLOR: theme.palette.negative[400],
    INPUT_TEXT_COLOR,
    LABEL_COLOR: theme.palette.negative[300],
    LABEL_FONTSIZE: '0.9rem',
    COMMON_PROPERTIES: {
      color: INPUT_TEXT_COLOR,
      backgroundColor: theme.palette.base[100],
      fontSize: '0.95rem',
      fontFamily: FONT_FAMILY,
      height: '40px'
    }
  }
}

export const monstersOptions: MonstersOptions = {
  type: [
    'Aberration',
    'Beast',
    'Celestial',
    'Construct',
    'Dragon',
    'Elemental',
    'Fey',
    'Giant',
    'Humanoid',
    'Monstrosity',
    'Ooze',
    'Plant',
    'Undead'
  ],
  size: ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'],
  habitat: ['Artic', 'Coastal', 'Desert', 'Forest', 'Grassland', 'Hill', 'Mountain', 'Plannar'],
  alignment: [
    'Lawful Good',
    'Neutral Good',
    'Chaotic Good',
    'Neutral',
    'Lawful Evil',
    'Neutral Evil',
    'Chaotic Evil',
    'Unaligned'
  ],
  language: [
    'Aarakocra',
    'Abyssal',
    'Celestial',
    'Common',
    'Draconic',
    'Dwarvish',
    'Elvish',
    'Giant',
    'Infernal',
    'Orc',
    'Primordial',
    'Sylvan'
  ],
  source: [
    'Monster Manual',
    "Volo's Guide to Monsters",
    "Mordenkainen's Tome of Foes",
    "Tasha's Cauldron of Everything"
  ]
}
