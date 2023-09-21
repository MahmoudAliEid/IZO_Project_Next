// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

const AnalyticsCustomCard = ({ data, handleOptionSelect, title, avatar }) => {
  return (
    <CardStatisticsVertical
      title={title}
      stats={data?.Expense ? data.Expense : ' 0'}
      trendNumber={data ? Number(data.Percent) : 0}
      avatarSrc={avatar}
      handleOptionSelect={handleOptionSelect}
    />
  )
}

export default AnalyticsCustomCard
