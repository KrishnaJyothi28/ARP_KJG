import { useContext, useEffect, useState } from 'react'
import { X } from 'react-bootstrap-icons'
import Modal from 'react-modal'
import BarChart from 'src/containers/BarChart'
import BulletListCard from 'src/containers/BulletList'
import CardTitle from 'src/containers/CardTitle'
import DomainList from 'src/containers/DomainList'
import DonutChart from 'src/containers/DonutChart'
import SurveyTable from 'src/containers/SurveyTable'
import SalarySquareChart from 'src/containers/SalarySquareChart'
import { CriteriaContext } from 'src/contexts/criteria'
import { dataAPI } from 'src/services/dataAPI'
import { OccupationModalProps, SurveyTablePropType } from '../../lib/interface'
import s from './style.module.css'

export default function OccupationModal({ openModal, closeModal }: OccupationModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [occupation, setOccupation] = useState<any>([])
  const [jobPosting, setJobPosting] = useState('0')
  const [avgSalary, setAvgSalary] = useState('0')

  const criteria = useContext(CriteriaContext)
  let occupationData = criteria.defaultCriteria.occupationMetaData

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const occu = criteria.defaultCriteria.occupationMetaData.find(
          (item) => item.id === criteria.defaultCriteria.occupation.id
        )
        setOccupation(occu)

        const JobPostingCountValues = await dataAPI.getJobPostingCount(false, occupationData)
        const jobPosting = JobPostingCountValues.filter((item: any) => {
          return item.id === criteria.defaultCriteria.occupation.id
        })
        setJobPosting(jobPosting[0].count.toLocaleString())

        const AvgSalaryValues = await dataAPI.getJobPostingCount(true, occupationData)
        const avgSalary = AvgSalaryValues.filter((item: any) => {
          return item.id === criteria.defaultCriteria.occupation.id
        })
        setAvgSalary((avgSalary[0].count / 1000).toFixed(1).toString())
       
      } catch (error) {
        console.log(error)
        // Handle the error, such as displaying an error message
      }
      setIsOpen(openModal)
    }
    fetchData()
    setIsOpen(openModal)
  }, [
    openModal,
    criteria.defaultCriteria.occupation.name,
    criteria.defaultCriteria.occupation.id,
    criteria.defaultCriteria.metaData,
    criteria.defaultCriteria.occupationMetaData,
    occupation,
    occupationData,
  ])

  const handleCloseModal = () => {
    setIsOpen(false)
    closeModal && closeModal(false)
  }

  return (
    <Modal
      className={s.modalContainer}
      style={{ overlay: { backgroundColor: 'rgba(0, 0, 0,0.7)' } }}
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
    >
      <div className={s.titleContainer}>
        <div className={s.title}>{occupation && occupation.name}</div>
        <X className={s.closeIcon} size={40} onClick={handleCloseModal} />
      </div>
      <div className={s.description}>
        <div className={s.descSection} style={{ width: '50%' }}>
          <span>Description</span>
          <p>{occupation && occupation.description} </p>
        </div>
        <div className={s.descSection} style={{ width: '25%' }}>
          <span>National demand of work</span>
          {jobPosting && <span className={s.text}>{jobPosting}</span>}{' '}
        </div>
        <div className={s.descSection} style={{ width: '25%' }}>
          <span>Average Salary</span>
          {jobPosting && <span className={s.text}>${avgSalary}k</span>}
        </div>
      </div>
      <div className={s.chartContainer}>
        <div className={`${s.chart} ${s.BarChart}`}>
          <CardTitle
            title={'Job Postings/Demand'}
            details={
              'Emsi Burning Glass has compiled a dataset of millions of unique online job postings. Emsi Burning Glass “spidering” extracts information from more than 50,000 online job boards, newspapers, and employer sites on a daily basis and deduplicates postings for the same job, whether it is posted multiple times on the same site or across multiple sites. For an occupation to register demand in a particular location, there must be at least five job postings in the last year.'
            }
          />
          <BarChart
            valueType="JobDemand"
            bgColor="white"
            barsColor="rgb(253,229,190)"
            activeBarColor="rgb(54,122,186)"
          />
        </div>
        <div className={s.chart}>
          <CardTitle
            title={'Average market salary'}
            details={
              'Emsi Burning Glass has developed a methodology for estimating the salary tied to each job posting. This methodology uses a machine learning model built off of millions of job postings every year and accounts for adjustments based on locations, industry, skills, experience, and education requirements, among other variables. More than half of online job postings in the U.S. do not advertise salaries, so the trained model provides a more accurate and complete estimate for salaries. Salaries are estimated for each job posting. The average salary estimate represents the average salary advertised on a job posting, which is not necessarily the average salary of an employee in this position. For this reason, the term “market” salary is used, as it is the salary a job seeker is likely to get in the job market. An occupation must have at least 10 job postings in a given location to receive an average salary estimate.'
            }
          />
          <SalarySquareChart />
        </div>
        <div className={s.chart}>
          <CardTitle
            title={'Requested Degree'}
            details={
              'Emsi Burning Glass parses the level of education requested job postings. Job postings that do not include a requested level of education are not included in this calculation. This calculation is based on the minimum level of education requested in the job posting. Sub-BA stands for sub-baccalaureate and includes high school or vocational training, post-high school certification, and Associate’s degrees. BA stands for Bachelor’s degree required. Post-grad includes postbaccalaureate credentials, Master’s degrees, and doctoral degrees.'
            }
          />
          <DonutChart type="degree" bgColor="white" />
        </div>
      </div>
      <div className={s.chartContainer}>
        <div className={s.chart}>
          <CardTitle
            title={'Top Credentials'}
            details={
              'Emsi Burning Glass maintains a taxonomy of thousands of certifications. Certifications are parsed from job posting text and standardized to a single name in the certification taxonomy. For example, “Financial Risk Manager” and “FRM” are both standardized to “Financial Risk Manager (FRM).”'
            }
          />
          <BulletListCard type="topCredentials" bgColor="white" />
        </div>
        <div className={s.chart}>
          <CardTitle
            title={'Top specialized skills'}
            details={
              'Emsi Burning Glass maintains a taxonomy of skills, where “skill” also means knowledge, abilities, and tool proficiencies. Specialized skills are the professional and occupation-specific skills requested in job postings, such as skills related to accounting, finance, and the use of software programs. Specialized skills are defined in contrast to baseline skills, which are the foundational skills found across industries and occupations, such as teamwork or communication skills.'
            }
          />
          <BulletListCard type="topSpecializedSkills" bgColor="white" />
        </div>
        <div className={s.chart}>
          <CardTitle
            title={'Top Emerging Skills'}
            details={
              'Emsi Burning Glass has developed a methodology for predicting future demand for skills and skill clusters. The methodology uses machine learning modeling and econometric time series methods to estimate the labor market demand for each skill and skill cluster two years into the future. The skill clusters featured here are those projected to grow rapidly, increasing in demand by more than 50% over two years.'
            }
          />
          <BulletListCard type="topEmergingSkills" bgColor="white" />
        </div>
      </div>
      <div className={s.chartContainer}>
        <div className={s.chart}>
          <DomainList />
        </div>
        <div className={s.chart}>
          <CardTitle
            title={'AFP Compensation Survey'}
            details={
              'Compensation survey data come from the AFP Compensation report, which includes survey data on total compensation earned by financial professionals during the previous year. Compensation is defined as salary plus any bonuses awarded. The survey is sent to treasury and finance professionals with diverse corporate profiles, and senior-level respondents are also asked to provide compensation information for their organizations treasury and finance staff. In total 1,910 professionals holding the 19 job titles tracked, responded to the survey and provided salary information for 3,352 incumbents.'
            }
          />
          <SurveyTable />
          <p className={s.modalTableFooter}>
            Includes Base Salary and Bonus/Incentive Compensation.
            <br />
            Source: <u>2022 AFP Compensation Report</u>
            <br />
            Salaries are in USD
          </p>
        </div>
      </div>
      <br />
      <p className={s.modalFooter}>Source: All data provided by Emsi Burning Glass unless otherwise noted.</p>
    </Modal>
  )
}
