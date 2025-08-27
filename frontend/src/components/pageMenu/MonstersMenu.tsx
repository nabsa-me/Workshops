import { Box } from '@mui/material'
import { InputField } from '../common/inputs'
import { FiltersBlock } from './FiltersBlock'

export const MonstersMenu = () => {
  return (
    <Box sx={{ padding: '1.25rem 1.6rem 2rem 1.6rem', display: 'flex', flexWrap: 'wrap' }}>
      <FiltersBlock title='Monster Filters'>
        <InputField label='Monster Name' placeholder='Monster Name' />
        <InputField label='Type' placeholder='Giant, Humanoid...' />
        <InputField label='Size' placeholder='Tiny, Small...' />
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <InputField label='Min CR' placeholder='0' />
          <InputField label='Max CR' placeholder='30' />
        </Box>
        <InputField label='Habitat' placeholder='Arctic, Forest...' />
      </FiltersBlock>

      <FiltersBlock title='Advanced Filters'>
        <InputField label='Alignment' placeholder='Lawful, Good...' />
        <InputField label='Languages' placeholder='Elvish, Infernal...' />
        <InputField label='Source' placeholder='Book, Adventure...' />
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <InputField label='Leyendary' placeholder='-' />
          <InputField label='Mythic' placeholder='-' />
          <InputField label='Has Lair' placeholder='-' />
        </Box>
      </FiltersBlock>

      <FiltersBlock title='Battle Field Filters'>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <InputField label='Armor Class' placeholder='Min' />
          <InputField label='Armor Class' placeholder='Max' />
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <InputField label='Avg HP' placeholder='Min' />
          <InputField label='Avg HP' placeholder='Max' />
        </Box>
        <InputField label='Resistance' placeholder='Piercing, Cold...' />
        <InputField label='Vulnerability' placeholder='Thunder, Poison...' />
        <InputField label='Senses' placeholder='Darkvision, Blindsight...' />
        <InputField label='Damage Inmunity' placeholder='Poison, Slashing...' />
        <InputField label='Condition Inmunity' placeholder='Blinded, Charmed...' />
        <InputField label='Save Proficiency' placeholder='STR, DEX...' />
        <InputField label='Skill Proficiency' placeholder='Acrobatics, Arcana...' />
        <InputField label='Movement Type' placeholder='Walk, Burrow...' />
      </FiltersBlock>
    </Box>
  )
}
