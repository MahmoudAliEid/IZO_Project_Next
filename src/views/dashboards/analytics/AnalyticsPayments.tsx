// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

//import { OptionType } from 'src/@core/components/option-menu/types'

type CardStatisticsProps = {
  Purchase: string
  Percent: number

}
const AnalyticsPayments = ({ Purchase, Percent }: CardStatisticsProps) => {
  return (
    <CardStatisticsVertical
      stats={Purchase}
      trend={Percent >= 50 ? "positive" : 'negative'}
      title='Purchase'
      path='/dashboards/purchases'
      trendNumber={Percent}
      avatarSrc='/images/cards/stats-vertical-paypal.png'
    />
  )
}

export default AnalyticsPayments
