import { useContext } from 'react'
import { CriteriaContext } from 'src/contexts/criteria'
import {Link} from 'ui/Link'
import JsonData from '../../../../../public/LinkComponent_Purdue.json'

export default function DomainList() {
  const listData = JsonData['data']

  const criteriaContext = useContext(CriteriaContext)
  return <Link cardHeader="Knowledge Domains"
  listColor="powderblue"
  imageWidth={200}
  imageHeight={100}
  localImage={'logo.png'}
  buttonBorder='5px'
  hoverText="Knowledge domains are areas of subject matter expertise that have been curated by AFP to be relevant to certification exams that financial professionals can pursue, including the Certified Corporate Financial Planning & Analysis Professional (FPAC) examination and the Certified Treasury Professional (CTP) examination."
  listData={listData}/>
}
