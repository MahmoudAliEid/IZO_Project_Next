// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

const AnalyticsSales = ({
  Sale_section, handleOptionSelect }) => {
  return (
    <CardStatisticsVertical
      title='Sales'
      stats={Sale_section?.Sale ? Sale_section?.Sale : 0}
      trendNumber={Sale_section?.Percent ? Sale_section?.Percent : 0}
      avatarSrc='/images/cards/stats-vertical-wallet.png'
      handleOptionSelect={handleOptionSelect}
    />
  )
}

export default AnalyticsSales
