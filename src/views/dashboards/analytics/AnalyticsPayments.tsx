// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import { OptionType } from 'src/@core/components/option-menu/types'

type CardStatisticsProps = {
  Purchase: string
  Percent: number
  handleOptionSelect?: (event: OptionType) => void
}
const AnalyticsPayments = ({ Purchase, Percent, handleOptionSelect }: CardStatisticsProps) => {
  return (
    <CardStatisticsVertical
      stats={Purchase}
      trend={Percent >= 50 ? "positive" : 'negative'}
      title='Purchase'
      trendNumber={Percent}
      avatarSrc='/images/cards/stats-vertical-paypal.png'
      handleOptionSelect={handleOptionSelect}
    />
  )
}

export default AnalyticsPayments
