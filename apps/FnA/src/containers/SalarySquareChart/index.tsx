import { useContext, useEffect, useState } from 'react'
import { CriteriaContext } from 'src/contexts/criteria'
import { dataAPI } from 'src/services/dataAPI'
import SquareAreaChart from 'ui/SquareAreaChart'

const SalarySquareChart: React.FC = () => {
  const [squareData, setSquareData] = useState<any>()
  const criteriaContext = useContext(CriteriaContext)
  let occupationData = criteriaContext.defaultCriteria.occupationMetaData

  useEffect(() => {
    async function fetchData() {
      const data = await dataAPI.getJobPostingCount(true, occupationData)
      setSquareData(data)
    }
    fetchData()
  }, [criteriaContext, occupationData])

  return (
    <div>
      {squareData && (
        <SquareAreaChart selectedOccId={criteriaContext.defaultCriteria.occupation.id} data={squareData} />
      )}
    </div>
  )
}

export default SalarySquareChart
