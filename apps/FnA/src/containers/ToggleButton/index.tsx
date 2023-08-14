import { useEffect, useState } from 'react'
import { useCriteriaContext } from 'src/contexts/criteria'
import ToggleButton from 'ui/ToggleButton'

export default function Toggle() {
  const [enabledType, setEnabledType] = useState<string>('')
  const [disabledType, setDisabledType] = useState<string>('')
  const criteriaContext = useCriteriaContext()

  useEffect(() => {
    if (criteriaContext.defaultCriteria.valueType) {
      setEnabledType('Job Posting')
      setDisabledType('Salary')
    } else {
      setEnabledType('Salary')
      setDisabledType('Job Posting')
    }
  }, [criteriaContext.defaultCriteria.valueType])

  const handleToggleClick = (isChecked: boolean) => {
    criteriaContext.setValueType(isChecked)
  }
  return (
    <ToggleButton
      enabled={'Job Posting'}
      disabled={'Salary'}
      isClicked={criteriaContext.defaultCriteria.valueType}
      onClick={(isChecked: boolean) => handleToggleClick(isChecked)}
    ></ToggleButton>
  )
}
