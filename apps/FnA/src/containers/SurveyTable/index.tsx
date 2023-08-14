import { useContext, useEffect, useState } from 'react'
import { dataAPI } from 'src/services/dataAPI'
import { CriteriaContext } from 'src/contexts/criteria'
import { SurveyTablePropType } from 'src/lib/interface'
import {BsTable} from 'ui/BsTable'

export default function SurveyTable() {
  const criteriaContext = useContext(CriteriaContext)
  const [surveyData, setSurveyData] = useState<SurveyTablePropType[]>([])

  useEffect(()=>{    
    const surveyDataSet: SurveyTablePropType[] = [
      {
        salary: 'Mean',
        value: '0',
      },
      {
        salary: '25th percentile',
        value: '0',
      },
      {
        salary: '50th percentile',
        value: '0',
      },
      {
        salary: '75th percentile',
        value: '0',
      },
    ]
    setSurveyData(surveyDataSet)
    const fetchData = async () => {
    const surveydataalues = await dataAPI.getSalaryPercentile(
      criteriaContext.defaultCriteria.occupation.id,
      criteriaContext.defaultCriteria.metaData
    )
    surveyDataSet[0].value = (surveydataalues[0] / 1000).toFixed(1).toString()
    surveyDataSet[1].value = (surveydataalues[1] / 1000).toFixed(1).toString()
    surveyDataSet[2].value = (surveydataalues[2] / 1000).toFixed(1).toString()
    surveyDataSet[3].value = (surveydataalues[3] / 1000).toFixed(1).toString()

    setSurveyData(surveyDataSet)}
    fetchData();
  },[])
  return <BsTable occName = {criteriaContext.defaultCriteria.occupation.name} surveyData = {surveyData}/>
}
