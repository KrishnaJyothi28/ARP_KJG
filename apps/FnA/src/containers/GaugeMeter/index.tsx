import { useContext, useEffect, useState } from 'react'
import { CriteriaContext } from 'src/contexts/criteria'
import { StateOrMsa } from 'src/lib/interface'
import { dataAPI } from 'src/services/dataAPI'
import GaugeChart from 'ui/GaugeChart'

export default function GaugeMeter() {
  const [gaugeData, setGaugeData] = useState<number[]>([])
  const [stateOrMsaCode, setStateOrMsaCode] = useState<string>('')
  const criteriaContext = useContext(CriteriaContext)

  useEffect(() => {
    setStateOrMsaCode(criteriaContext.defaultCriteria.location.id.toString())
    let stateOrMsaData
    criteriaContext.defaultCriteria.location.type === 'state'
      ? (stateOrMsaData = criteriaContext.defaultCriteria.stateOrMsaMetaData[0].States)
      : (stateOrMsaData = criteriaContext.defaultCriteria.stateOrMsaMetaData[0].Msa)
    async function fetchData(selectedStateOrMsa: string, stateOrMsaData: StateOrMsa[]) {
      const data = await dataAPI.getDemandSupplyRatio(selectedStateOrMsa, stateOrMsaData)
      setGaugeData(data)
    }
    fetchData(stateOrMsaCode, stateOrMsaData)
  }, [
    criteriaContext.defaultCriteria.location.id,
    criteriaContext.defaultCriteria.location.type,
    criteriaContext.defaultCriteria.stateOrMsaMetaData,
    stateOrMsaCode,
  ])
  return (
    <GaugeChart startValue={gaugeData[0]} endValue={gaugeData[1]} pointedValue={gaugeData[2]} duration={1}></GaugeChart>
  )
}
