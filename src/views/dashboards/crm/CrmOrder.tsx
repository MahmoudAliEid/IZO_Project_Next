// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import { crmOrder } from 'src/types/custom/crmOrderTypes'

const CrmOrder = ({ title, stats, trendNumber, avaterSrc }: crmOrder) => {
  return (
  <>
       {/* @ts-ignore */}
      <CardStatisticsVertical
        title={title || 'Order'}
        stats={stats || '$1,286'}
        trend={'negative'}
        trendNumber={trendNumber || 13.24}
        avatarSrc={avaterSrc || '/images/cards/stats-vertical-cube.png'}
      />
  </>
  )
}

export default CrmOrder
