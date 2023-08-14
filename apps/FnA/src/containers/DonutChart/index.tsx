import { useContext, useEffect, useState } from 'react'
import { CriteriaContext } from 'src/contexts/criteria'
import { dataAPI } from 'src/services/dataAPI'
import Donut from 'ui/Donut'

export default function DonutChart({ type, bgColor }: { type: string; bgColor?: string }) {
  const [degree, setDegree] = useState<any>([])
  const [experience, setExperience] = useState<any>([])
  const [donutData, setDonutData] = useState<any>([])
  const criteriaContext = useContext(CriteriaContext)

  useEffect(() => {
    async function fetchExperienceData(occId: string, metaData: string[]) {
      const experienceData = await dataAPI.getOccupationExperience(occId, metaData)
      setExperience(experienceData)
    }
    fetchExperienceData(criteriaContext.defaultCriteria.occupation.id, criteriaContext.defaultCriteria.metaData)
  }, [criteriaContext.defaultCriteria.metaData, criteriaContext.defaultCriteria.occupation.id])

  useEffect(() => {
    async function fetchDegreeData(occId: string, metaData: string[]) {
      const degreeData = await dataAPI.getOccupationDegree(occId, metaData)
      setDegree(degreeData)
    }
    fetchDegreeData(criteriaContext.defaultCriteria.occupation.id, criteriaContext.defaultCriteria.metaData)
  }, [criteriaContext.defaultCriteria.metaData, criteriaContext.defaultCriteria.occupation.id])

  useEffect(() => {
    if (type === 'degree') {
      setDonutData(degree)
    } else {
      setDonutData(experience)
    }
  }, [degree, experience, type])

  return (
    <Donut
      inputData={donutData}
      size={100}
      color={['#faa42a', '#cfe0f2', '#3fb7cf']}
      bgColor={bgColor || 'rgb(12, 31, 50)'}
    />
  )
}
