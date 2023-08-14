import { useContext, useEffect, useState } from 'react'
import { CriteriaContext } from 'src/contexts/criteria'
import { Data } from 'src/lib/interface'
import USMapChart from 'ui/USMapChart'

export default function StateMSAMapChart() {
  const [mapData, setMapData] = useState<Data[]>([])
  const criteriaContext = useContext(CriteriaContext)
  useEffect(() => {
    setMapData(criteriaContext.defaultCriteria.stateOrMsaMetaData)
  }, [criteriaContext.defaultCriteria.stateOrMsaMetaData])

  const handleSelectedLoc = (id: string, name: string, code: string) => {
    let updatedLocation: {
      id: string
      code: string
      type: string
      name: string
      jobPostingsDemand: string
      workerRolesupply: string
      averageSalary: string
    } = {
      ...criteriaContext.defaultCriteria.location,
      id: id,
      name: name,
      code: code,
      jobPostingsDemand: '',
      workerRolesupply: '',
      averageSalary: '',
    }
    criteriaContext.setLocation(updatedLocation)
  }

  return (
    <USMapChart
      locSelected={criteriaContext.defaultCriteria.location.id.toString()}
      mapData={mapData}
      selectedLoc={(id: string, name: string, code: string) => handleSelectedLoc(id, name, code)}
      locType={criteriaContext.defaultCriteria.location.type}
      type={criteriaContext.defaultCriteria.valueType ? 'salary' : 'job posting'}
      mapSize={0.75}
      bgColor="#0C1F32"
      startColor={criteriaContext.defaultCriteria.valueType ? 'rgb(181, 228, 237)' : 'rgb(252, 255, 189)'}
      endColor={criteriaContext.defaultCriteria.valueType ? 'rgb(29, 93, 106)' : 'rgb(242, 105, 48)'}
      toggleSelection = {criteriaContext.defaultCriteria.valueType}
    />
  )
}
