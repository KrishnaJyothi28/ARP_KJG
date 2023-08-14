import { useContext, useEffect, useState } from 'react'
import { CriteriaContext } from 'src/contexts/criteria'
import { Data } from 'src/lib/interface'
import Legend from 'ui/Legend'

export default function MapLegend() {
  const criteriaContext = useContext(CriteriaContext)
  const [mapData, setMapData] = useState<Data[]>([])
  const [legendType, setLegendType] = useState<string>('salary')

  useEffect(() => {
    setMapData(criteriaContext.defaultCriteria.stateOrMsaMetaData)
    criteriaContext.defaultCriteria.valueType ? setLegendType('Salary') : setLegendType('job posting')
  }, [criteriaContext.defaultCriteria.stateOrMsaMetaData, criteriaContext.defaultCriteria.valueType])

  const findMinNMax = (type: string, locType: string) => {
    let jobPostingArray: number[] = []
    let minNMax: number[] = []
    if (mapData && mapData.length > 0) {
      if (locType === 'state') {
        type === 'Salary'
          ? (jobPostingArray = mapData[0]?.States.map((state) => state.AverageSalary))
          : (jobPostingArray = mapData[0]?.States.map((state) => state.JobPostingsDemand))
      } else {
        type === 'Salary' && mapData[0]
          ? (jobPostingArray = mapData[0].Msa.map((msa) => msa.AverageSalary))
          : (jobPostingArray = mapData[0].Msa.map((msa) => msa.AverageSalary))
      }
    }
    if (jobPostingArray.length > 0) {
      minNMax.push(Math.min(...jobPostingArray))
      minNMax.push(Math.max(...jobPostingArray))
    }
    return minNMax
  }

  return (
    <Legend
      title={legendType}
      minNMaxValue={findMinNMax(legendType, criteriaContext.defaultCriteria.location.type)}
      numIntervals={4}
      startColor={criteriaContext.defaultCriteria.valueType ? 'rgb(181, 228, 237)' : 'rgb(252, 255, 189)'}
      endColor={criteriaContext.defaultCriteria.valueType ? 'rgb(29, 93, 106)' : 'rgb(242, 105, 48)'}
    />
  )
}
