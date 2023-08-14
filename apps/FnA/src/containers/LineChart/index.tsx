import { useContext, useEffect, useState } from 'react'
import { CriteriaContext } from 'src/contexts/criteria'
import { Data } from 'src/lib/interface'
import LineBar from 'ui/LineBar'

export default function LineChart({ type }: { type: string }) {
  const [mapData, setMapData] = useState<Data[]>([])
  const [stateOrMsaId, setStateOrMsaId] = useState<string>('')
  const criteriaContext = useContext(CriteriaContext)
  useEffect(() => {
    setStateOrMsaId(criteriaContext.defaultCriteria.location.id.toString())
    setMapData(criteriaContext.defaultCriteria.stateOrMsaMetaData)
  }, [criteriaContext.defaultCriteria.location.id, criteriaContext.defaultCriteria.stateOrMsaMetaData])

  return (
    <>
      {mapData && mapData.length > 0 && (
        <LineBar
          data={mapData}
          stateOrMsaCode={stateOrMsaId}
          locType={criteriaContext.defaultCriteria.location.type}
          type={type}
        />
      )}
    </>
  )
}
