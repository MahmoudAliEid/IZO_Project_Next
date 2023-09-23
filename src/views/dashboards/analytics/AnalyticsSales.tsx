// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import { OptionType } from 'src/@core/components/option-menu/types'

type AnalyticsSales = {
  Sale_section: {
    Sale_section: string,
    Percent: number,
  },
}
const AnalyticsSales = ({
  Sale_section, Percent }: AnalyticsSales) => {
  return (
    <CardStatisticsVertical
      title='Sales'
      path='/dashboards/sales'
      stats={Sale_section ? Sale_section : 0}
      trendNumber={Percent}
      avatarSrc='/images/cards/stats-vertical-wallet.png'
    />
  )
}

export default AnalyticsSales
