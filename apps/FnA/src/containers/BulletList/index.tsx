import { useContext } from 'react'
import { CriteriaContext } from 'src/contexts/criteria'
import BulletList from 'ui/BulletList'

export default function BulletListCard({ type, bgColor }: { type: string, bgColor?:string }) {
  const criteriaContext = useContext(CriteriaContext)
  return <BulletList occId={criteriaContext.defaultCriteria.occupation.id} metaData={criteriaContext.defaultCriteria.metaData} type={type} bgColor={bgColor||'rgb(12, 31, 50)'} />
}
