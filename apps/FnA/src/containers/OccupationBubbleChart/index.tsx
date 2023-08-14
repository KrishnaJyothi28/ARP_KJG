import { useEffect, useState } from 'react'
import { useCriteriaContext } from 'src/contexts/criteria'
import { BubbleChartData, Occupation } from 'src/lib/interface'
import { dataAPI } from 'src/services/dataAPI'
import { BubbleChart } from 'ui'

export default function OccupationBubbleChart() {
  const criteriaContext = useCriteriaContext()
  const [bubbleData, setBubbleData] = useState<BubbleChartData[]>([])
  useEffect(() => {
    let occData = criteriaContext.defaultCriteria.occupationMetaData

    async function fetchData(valueType: boolean, occupationData: Occupation[]) {
      const data = await dataAPI.getJobPostingCount(valueType, occupationData)
      setBubbleData(data)
    }
    fetchData(criteriaContext.defaultCriteria.valueType, occData)
  }, [
    criteriaContext.defaultCriteria.occupation.id,
    criteriaContext.defaultCriteria.occupationMetaData,
    criteriaContext.defaultCriteria.stateOrMsaMetaData,
    criteriaContext.defaultCriteria.valueType,
  ])

  return (
    <BubbleChart
      data={bubbleData}
      type={criteriaContext.defaultCriteria.valueType}
      title=""
      bgColor={'#0C1F32'}
      titleColor="rgb(254,217,165)"
      toolTipContent={criteriaContext.defaultCriteria.valueType ? 'Salary' : 'Job Postings'}
      circleTextColor={criteriaContext.defaultCriteria.valueType ? '#f8fafc' : '#202121'}
      minColorShade={criteriaContext.defaultCriteria.valueType ? '#7dd3fc' : '#fed9a5'}
      maxColorShade={criteriaContext.defaultCriteria.valueType ? '#0369a1' : '#e69f3c'}
      tooltipBgColor="#075985"
    />
  )
}
