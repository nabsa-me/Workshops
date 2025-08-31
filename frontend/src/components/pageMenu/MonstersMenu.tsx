import { Box } from '@mui/material'
import { InputField } from '../common/inputs'
import { FiltersBlock } from './FiltersBlock'
import { SwitchButton } from '../common/buttons'
import { MultipleSelectorPlaceholder } from '../common/selectors'

export const MonstersMenu = () => {
  return (
    <Box sx={{ padding: '1.25rem 25px 2rem 25px', display: 'flex', flexWrap: 'wrap' }}>
      <FiltersBlock title='Monster Filters'>
        <InputField label='Monster Name' placeholder='Monster Name' />
        <MultipleSelectorPlaceholder label='Type' placeholder='Giant, Humanoid...' />
        <MultipleSelectorPlaceholder label='Size' placeholder='Tiny, Small...' />
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <InputField label='Min CR' placeholder='0' />
          <InputField label='Max CR' placeholder='30' />
        </Box>
        <InputField label='Habitat' placeholder='Arctic, Forest...' />
      </FiltersBlock>

      <FiltersBlock title='Advanced Filters'>
        <MultipleSelectorPlaceholder label='Alignment' placeholder='Lawful, Good...' />
        <MultipleSelectorPlaceholder label='Languages' placeholder='Elvish, Infernal...' />
        <MultipleSelectorPlaceholder label='Source' placeholder='Book, Adventure...' />
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <SwitchButton label='Leyendary' />
          <SwitchButton label='Mythic' />
          <SwitchButton label='Has Lair' />
        </Box>
        <MultipleSelectorPlaceholder label='Size' placeholder='Tiny, Small...' />
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
        <MultipleSelectorPlaceholder label='Resistance' placeholder='Piercing, Cold...' />
        <MultipleSelectorPlaceholder label='Vulnerability' placeholder='Thunder, Poison...' />
        <MultipleSelectorPlaceholder label='Senses' placeholder='Darkvision, Blindsight...' />
        <MultipleSelectorPlaceholder label='Damage Inmunity' placeholder='Poison, Slashing...' />
        <MultipleSelectorPlaceholder label='Condition Inmunity' placeholder='Blinded, Charmed...' />
        <MultipleSelectorPlaceholder label='Save Proficiency' placeholder='STR, DEX...' />
        <MultipleSelectorPlaceholder label='Skill Proficiency' placeholder='Acrobatics, Arcana...' />
        <MultipleSelectorPlaceholder label='Movement Type' placeholder='Walk, Burrow...' />
      </FiltersBlock>
    </Box>
  )
}
