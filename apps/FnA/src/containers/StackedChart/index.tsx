import { useContext, useEffect, useState } from 'react'
import { CriteriaContext } from 'src/contexts/criteria'
import { Data } from 'src/lib/interface'
import HorizontalBarChart from 'ui/HorizontalBarChart'

export default function StackedChart({ title }: { title: string }) {
  const [mapData, setMapData] = useState<Data[]>([])
  const [stateOrMsaCode, setStateOrMsaCode] = useState<string>('')
  const criteriaContext = useContext(CriteriaContext)
  useEffect(() => {
    setMapData(criteriaContext.defaultCriteria.stateOrMsaMetaData)
    setStateOrMsaCode(criteriaContext.defaultCriteria.location.id.toString())
  }, [criteriaContext.defaultCriteria.location.id, criteriaContext.defaultCriteria.stateOrMsaMetaData])

  return (
    <>
      {mapData && mapData.length > 0 && (
        <HorizontalBarChart
          data={mapData}
          title={title}
          stateOrMsaCode={stateOrMsaCode}
          locType={criteriaContext.defaultCriteria.location.type}
          bgColor="rgb(12, 31, 50)"
        />
      )}
    </>
  )
}
