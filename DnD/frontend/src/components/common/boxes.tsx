import { Divider, DividerProps, styled } from '@mui/material'

const Section = styled(Divider)(({ theme }) => ({
  boxShadow: `0px 2px 5px ${theme.palette.secondary[300]}60`,
  width: '100%'
}))

export const SectionDivider = (props: DividerProps) => {
  return <Section {...props} />
}
