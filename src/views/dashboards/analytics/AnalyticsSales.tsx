// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import { OptionType } from 'src/@core/components/option-menu/types'

type AnalyticsSales = {
  Sale_section: {
    Sale: string,
    Percent: number,
  },
  handleOptionSelect: (event: OptionType) => void,
}
const AnalyticsSales = ({
  Sale_section, handleOptionSelect }: AnalyticsSales) => {
  return (
    <CardStatisticsVertical
      title='Sales'
      stats={Sale_section?.Sale ? Sale_section.Sale : " 0"}
      trendNumber={Sale_section?.Percent ? Number(Sale_section.Percent) : 0}
      avatarSrc='/images/cards/stats-vertical-wallet.png'
      handleOptionSelect={handleOptionSelect}
    />
  )
}

export default AnalyticsSales
