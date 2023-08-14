import { useContext, useEffect, useState } from 'react'
import { CriteriaContext } from 'src/contexts/criteria'
import { locationType } from 'src/lib/interface'
import SearchDropDown from 'ui/SearchDropDown'

export default function OccupationDropDown() {
  const [stateNMSA, setStateNMSA] = useState<locationType[]>([])
  const criteriaContext = useContext(CriteriaContext)

  useEffect(() => {
    const stateNames = criteriaContext.defaultCriteria.stateOrMsaMetaData[0].States.map((item) => ({
      id: item.Id,
      name: item.Name,
      code: item.Id,
      type: 'state',
    }))
    const msaNames = criteriaContext.defaultCriteria.stateOrMsaMetaData[0].Msa.map((item) => ({
      id: item.Id,
      name: item.Name,
      code: item.Id,
      type: 'msa',
    }))
    setStateNMSA(stateNames.concat(msaNames))
  }, [criteriaContext.defaultCriteria.stateOrMsaMetaData])

  const handleOccupationOnChange = (selectedItem: any) => {
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
      id: selectedItem[0].id.toString(),
      name: selectedItem[0].name,
      code: '',
      type: selectedItem[0].type,
      jobPostingsDemand: '',
      workerRolesupply: '',
      averageSalary: '',
    }
    criteriaContext.setLocation(updatedLocation)
  }

  const handleClearSelectedLoc = () => {
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
      id: '',
      name: '',
      code: '',
      type: 'state',
      jobPostingsDemand: '',
      workerRolesupply: '',
      averageSalary: '',
    }
    criteriaContext.setLocation(updatedLocation)
  }

  return (
    <div>
      <SearchDropDown
        placeholder="Search County or Metro Area"
        defaultValue={
          criteriaContext.defaultCriteria.location.id !== '' ? criteriaContext.defaultCriteria.location.name : ''
        }
        data={stateNMSA}
        handleSelestedLoc={(item: any) => handleOccupationOnChange(item)}
        clearSelectedLoc={() => handleClearSelectedLoc()}
      />
    </div>
  )
}
