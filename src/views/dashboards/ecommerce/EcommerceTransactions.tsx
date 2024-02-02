// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

const EcommerceTransactions = () => {
  return (
    <>
    {/* @ts-ignore */}
    <CardStatisticsVertical
      stats='$14,854'
      title='Transactions'
      trendNumber={17.53}
      avatarSrc='/images/cards/stats-vertical-card.png'
    />
    </>
  )
}

export default EcommerceTransactions
