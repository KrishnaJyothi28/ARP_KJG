import { useContext, useEffect, useState } from 'react'
import { CriteriaContext } from 'src/contexts/criteria'
import { ColumnDropDownData } from 'src/lib/interface'
import { ColumnDropDown } from 'ui'

export default function OccupationDropDown() {
  const [columnDropDownData, setColumnDropDownData] = useState<ColumnDropDownData[]>([])

  const criteriaContext = useContext(CriteriaContext)

  useEffect(() => {
    let occupationList: { id: string; name: string }[] = criteriaContext.defaultCriteria.occupationMetaData
    setColumnDropDownData(occupationList)
  }, [criteriaContext])

  const handleOccupationOnChange = (selectedItem: any) => {
    let updatedOccupation: { id: string; name: string } = {
      ...criteriaContext.defaultCriteria.occupation,
      id: selectedItem.id,
      name: selectedItem.name,
    }

    criteriaContext.setOccupation(updatedOccupation)
  }

  return (
    <div>
      <ColumnDropDown columnData={columnDropDownData} SelectedOccId={(item: any) => handleOccupationOnChange(item)} />
    </div>
  )
}
