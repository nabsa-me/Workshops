import { Box } from '@mui/material'
import { InputField } from '../common/inputs'
import { FiltersBlock } from './FiltersBlock'
import { SwitchButton } from '../common/buttons'
import { SelectorPlaceholder } from '../common/selectors'
import { monstersOptions } from '../common/helper'

export const MonstersMenu = () => {
  return (
    <Box sx={{ padding: '1.25rem 30px 2rem 30px', display: 'flex', flexWrap: 'wrap' }}>
      <FiltersBlock title='Monster Filters'>
        <InputField label='Monster Name' placeholder='Monster Name' />
        <SelectorPlaceholder label='Type' placeholder='Giant, Humanoid...' options={monstersOptions['type']} />
        <SelectorPlaceholder label='Size' placeholder='Tiny, Small...' options={monstersOptions['size']} />
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <InputField label='Min CR' placeholder='0' />
          <InputField label='Max CR' placeholder='30' />
        </Box>
        <SelectorPlaceholder label='Habitat' placeholder='Arctic, Forest...' options={monstersOptions['habitat']} />
      </FiltersBlock>

      <FiltersBlock title='Advanced Filters'>
        <SelectorPlaceholder label='Alignment' placeholder='Lawful, Good...' options={monstersOptions['alignment']} />
        <SelectorPlaceholder
          label='Languages'
          placeholder='Elvish, Infernal...'
          options={monstersOptions['language']}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <SwitchButton label='Leyendary' />
          <SwitchButton label='Mythic' />
          <SwitchButton label='Has Lair' />
        </Box>
        <SelectorPlaceholder label='Source' placeholder='Book, Adventure...' options={monstersOptions['source']} />
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
        <SelectorPlaceholder label='Resistance' placeholder='Piercing, Cold...' options={[]} />
        <SelectorPlaceholder label='Vulnerability' placeholder='Thunder, Poison...' options={[]} />
        <SelectorPlaceholder label='Senses' placeholder='Darkvision, Blindsight...' options={[]} />
        <SelectorPlaceholder label='Damage Inmunity' placeholder='Poison, Slashing...' options={[]} />
        <SelectorPlaceholder label='Condition Inmunity' placeholder='Blinded, Charmed...' options={[]} />
        <SelectorPlaceholder label='Save Proficiency' placeholder='STR, DEX...' options={[]} />
        <SelectorPlaceholder label='Skill Proficiency' placeholder='Acrobatics, Arcana...' options={[]} />
        <SelectorPlaceholder label='Movement Type' placeholder='Walk, Burrow...' options={[]} />
      </FiltersBlock>
    </Box>
  )
}
