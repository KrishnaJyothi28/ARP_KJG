import { useContext, useEffect, useState } from 'react'
import { CriteriaContext } from 'src/contexts/criteria'
import { BarChartProps, ColumnChartData, Occupation, StateOrMsa } from 'src/lib/interface'
import { dataAPI } from 'src/services/dataAPI'
import VerticalBarChart from 'ui/VerticalBarChart'

export default function BarChart({ valueType, bgColor, barsColor, activeBarColor, data }: BarChartProps) {
  const [columnChartData, setColumnChartData] = useState<ColumnChartData[]>([])
  const criteriaContext = useContext(CriteriaContext)

  useEffect(() => {
    let stateOrMsaData: StateOrMsa[]
    let occupationData: Occupation[]
    criteriaContext.defaultCriteria.location.type === 'state'
      ? (stateOrMsaData = criteriaContext.defaultCriteria.stateOrMsaMetaData[0].States)
      : (stateOrMsaData = criteriaContext.defaultCriteria.stateOrMsaMetaData[0].Msa)
    occupationData = criteriaContext.defaultCriteria.occupationMetaData
    async function fetchData() {
      if (valueType === 'JobDemand') {
        const jobposting = await dataAPI.getAllOccupationJobPostings(occupationData)
        setColumnChartData(jobposting)
      } else {
        const data = await dataAPI.getStateNSupply(stateOrMsaData)
        setColumnChartData(data)
      }
    }
    fetchData()
  }, [
    criteriaContext.defaultCriteria.location.type,
    criteriaContext.defaultCriteria.occupationMetaData,
    criteriaContext.defaultCriteria.stateOrMsaMetaData,
    valueType,
  ])

  return (
    <VerticalBarChart
      selectedId={
        valueType === 'JobDemand'
          ? criteriaContext.defaultCriteria.occupation.id
          : criteriaContext.defaultCriteria.location.id
      }
      data={columnChartData}
      barsColor={valueType === 'JobDemand' ? barsColor : 'rgb(25, 65, 105)'}
      activeBarColor={valueType === 'JobDemand' ? activeBarColor : 'rgb(250, 164, 42)'}
      valueType={valueType}
      backgroundColor={bgColor}
    />
  )
}
