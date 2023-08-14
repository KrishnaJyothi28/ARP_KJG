import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'
import { Facebook, Linkedin, Twitter } from 'react-bootstrap-icons'
import BarChart from 'src/containers/BarChart'
import BulletListCard from 'src/containers/BulletList'
import CardTitle from 'src/containers/CardTitle'
import DonutChart from 'src/containers/DonutChart'
import GaugeMeter from 'src/containers/GaugeMeter'
import LineChart from 'src/containers/LineChart'
import LocationDropDown from 'src/containers/LocationDropDown'
import MapLegend from 'src/containers/MapLegend'
import OccupationBubbleChart from 'src/containers/OccupationBubbleChart'
import OccupationDropDown from 'src/containers/OccupationDropDown'
import StackedChart from 'src/containers/StackedChart'
import StateMSAMapChart from 'src/containers/StateMSAMapChart'
import Toggle from 'src/containers/ToggleButton'
import { useCriteriaContext } from 'src/contexts/criteria'
import Modal from 'ui/EmbedPageComponent'
import Layout from '../layout'
import s from './style.module.css'

function InteractiveMap() {
  const [shareShow, setShareShow] = useState(false)
  const [embedShow, setEmbedShow] = useState(false)
  const criteriaContext = useCriteriaContext()
  const [selectedLocation, setSlectedLocation] = useState<string>(criteriaContext.defaultCriteria.location.type)

  const [filteredData, setfilteredData] = useState({
    Title: '',
    Description: '',
    TabContents: ['Tab 1 content', 'Tab 2 content', 'Tab 3 data', 'Tab 4 data'],
  })

  const handleShareClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setShareShow(true)
    const buttonText = event.currentTarget.textContent
    setfilteredData(filteredData)
  }
  const handleEmbedClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setEmbedShow(true)
    const buttonText = event.currentTarget.textContent
    setfilteredData(filteredData)
  }
  const handleCopy = () => {
    const textBox = document.getElementById('embedTextBox') as HTMLInputElement
    const copiedText = document.getElementById('copiedText') as HTMLInputElement
    textBox!.select()
    navigator.clipboard.writeText(textBox.value)
    copiedText.innerHTML = 'copied Text!'
  }
  const handleLocationClick = (location: string) => {
    let updatedLocation: { id: string; code: string; type: string; name: string,jobPostingsDemand:string,workerRolesupply:string,averageSalary:string }
    updatedLocation = { ...criteriaContext.defaultCriteria.location, type: location, id: '', code: '', name: '',jobPostingsDemand:'',workerRolesupply:'',averageSalary:'' }
    criteriaContext.setLocation(updatedLocation)
    setSlectedLocation(location)
  }

  return (
    <div>
      <Layout>
        <Modal
          title="Share"
          onClose={() => setShareShow(false)}
          closeBtn={false}
          show={shareShow}
          tabContent={filteredData.TabContents}
        >
          <button
            onClick={() =>
              window.open(
                'https://twitter.com/intent/tweet?url=https%3A%2F%2Ffinanceandaccountantcareers.com%2Fheatmap&text=Finance%26Accountants%20Carreers%20',
                '_blank'
              )
            }
            className={s.ShareButtons}
            style={{
              backgroundColor: '#1CA0F2',
            }}
          >
            <Twitter color="white" /> Twitter
          </button>
          <button
            onClick={() =>
              window.open(
                'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffinanceandaccountantcareers.com%2Fheatmap&ext=1687863193&hash=AeZypkPXMVqAHaX7Sxk',
                '_blank'
              )
            }
            className={s.ShareButtons}
            style={{
              backgroundColor: '#3B5897',
            }}
          >
            <Facebook color="white" /> Facebook
          </button>
          <button
            onClick={() =>
              window.open(
                'https://www.linkedin.com/shareArticle?url=https%3A%2F%2Ffinanceandaccountantcareers.com%2Fheatmap',
                '_blank'
              )
            }
            className={s.ShareButtons}
            style={{
              backgroundColor: '#0074B3',
            }}
          >
            <Linkedin color="white" /> LinkedIn
          </button>
        </Modal>
        <Modal
          title="Embed"
          onClose={() => setEmbedShow(false)}
          closeBtn={false}
          show={embedShow}
          tabContent={filteredData.TabContents}
        >
          <p style={{ marginLeft: '10px' }}>
            Embed map:
            <br />
            <textarea id="embedTextBox" style={{ width: '75%' }} rows={3} typeof="text">
              {
                "<iframe height='768' width='664' frameborder='0'  src='https://financeandaccountantcareers.com/heatmap_embed'></iframe>"
              }
            </textarea>
          </p>
          <p style={{ marginLeft: '10px' }}>
            Embed bubble chart:
            <br />
            <textarea style={{ width: '75%' }} rows={3} typeof="text">
              {
                "<iframe height='768' width='664' frameborder='0'  src='https://financeandaccountantcareers.com/heatmap_embed_bubble'></iframe>'></iframe>"
              }
            </textarea>
          </p>
          <p id="copiedText" style={{ color: '#83D2E2', marginLeft: '10px' }}></p>
          <button
            onClick={handleCopy}
            style={{ backgroundColor: '#FAA42A', float: 'right', margin: '10px' }}
            type="button"
            className={`btn btn-info btn-md ${s.CopyButton}`}
          >
            Copy Embed Code
          </button>
        </Modal>
        <div style={{ backgroundColor: '#112A45', color: 'white' }}>
          <div style={{ padding: '16px' }}>
            <h1 style={{ fontWeight: 'lighter', margin: '0 0 0 10px', paddingBottom: '10px' }}>
              Heatmap of Supply and Demand
            </h1>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ alignContent: 'flex-start' }}>
                <p className={s.textContent1}>
                  Use this interactive heatmap to explore granular snapshots of supply and demand data for transportation 
                  jobs at the state and metro area levels.
                </p>
                <p className={s.textContent2}>
                  Mouse over a state, metropolitan area, or title circle to see a high-level summary of the data. Toggle
                  between Job Openings and Salary to change the data presented. Click on a state or metropolitan to see
                  the detailed data. Select a title from the dropdown box to narrow the results to a single title.
                </p>
              </div>
              <div className={s.ShareNEmbed}>
                <button
                  onClick={handleShareClick}
                  type="button"
                  className={`btn btn-info btn-lg ${s.InteractivePageButtons}`}
                >
                  Share
                </button>
                <button
                  onClick={handleEmbedClick}
                  type="button"
                  className={`btn btn-info btn-lg ${s.InteractivePageButtons}`}
                >
                  Embed
                </button>
              </div>
            </div>
            <hr className={s.horizontalLine}></hr>
            <div className="row">
              <div className="col-lg-4">
                <OccupationDropDown />
              </div>

              <div className="col-lg-4">
                <Toggle />
              </div>

              <div className="col-lg-4" style={{ float: 'right' }}>
                <LocationDropDown />
              </div>
            </div>
          </div>
        </div>

        <div
          className="container-fluid"
          style={{ backgroundColor: '#193957', paddingTop: '30px', paddingBottom: '30px' }}
        >
          <div className={`row ${s.mapContainer}`}>
            <div className={`${s.mapItems} col-md-6`}>
              <div className={s.mapButton}>
                <button
                  className={`btn ${
                    selectedLocation === 'state' ? 'btn-outline-drak btn-warning text-dark' : 'btn-outline-light'
                  }`}
                  onClick={() => handleLocationClick('state')}
                >
                  States
                </button>
                <button
                  className={`btn ${
                    selectedLocation === 'msa' ? 'btn-outline-drak btn-warning text-dark' : 'btn-outline-light'
                  }`}
                  onClick={() => handleLocationClick('msa')}
                >
                  Metropolitan Areas
                </button>
              </div>
              <StateMSAMapChart />
              <MapLegend />
            </div>

            <div className={`${s.bubbleContainer} col-md-6`}>
              {criteriaContext.defaultCriteria && criteriaContext.defaultCriteria.location.id === '' && (
                <div>
                  <CardTitle
                    title={criteriaContext.defaultCriteria.valueType ? 'Average salary' : 'Job Postings/Demand'}
                    details={
                      "Emsi Burning Glass has compiled a dataset of millions of unique online job postings. Emsi Burning Glass's “spidering” extracts information from more than 50,000 online job boards, newspapers, and employer sites on a daily basis and deduplicates postings for the same job, whether it is posted multiple times on the same site or across multiple sites. For an occupation to register demand in a particular location, there must be at least five job postings in the last year."
                    }
                    bgColor={'rgb(12, 31, 50)'}
                  />
                  <OccupationBubbleChart />
                </div>
              )}
              {criteriaContext.defaultCriteria.location.id !== '' ? (
                <div>
                  <div className={`${s.vContainer}`}>
                    <div className="col-md-6">
                      <CardTitle
                        title={'Job Postings/Demand'}
                        details={
                          'Emsi Burning Glass has compiled a dataset of millions of unique online job postings. Emsi Burning Glass “spidering” extracts information from more than 50,000 online job boards, newspapers, and employer sites on a daily basis and deduplicates postings for the same job, whether it is posted multiple times on the same site or across multiple sites. For an occupation to register demand in a particular location, there must be at least five job postings in the last year'
                        }
                        bgColor={'rgb(12, 31, 50)'}
                      />
                      <StackedChart title="Job Postings/Demand" />
                    </div>
                    <div className="col-md-6">
                      <CardTitle
                        title={'Workers in Role/Supply'}
                        details={
                          'Emsi Burning Glass has developed a methodology for estimating the number of workers in each of the occupations represented on this site. The methodology involves redistributing publicly available data on the number of workers in finance occupations at the national, state, and metropolitan area levels into the job titles profiled on this site. For an occupation to register supply in a particular location, there must be at least five current workers employed in the position.'
                        }
                        bgColor={'rgb(12, 31, 50)'}
                      />
                      <StackedChart title="Workers in Role/Supply" />
                    </div>
                  </div>
                  <div className={`${s.gaugeContainer}`}>
                    <div className="col-md-6">
                      <CardTitle
                        title={'Supply/demand ratio'}
                        details={
                          'This ratio represents the number of current workers available to fill the job postings that accrue over the course of a year. The higher the number, the more workers available to fill a job posting. The lower the number, the fewer workers available to fill the position and/or the greater number of vacancies for a given position over the course of a year. For an occupation to register a supply/demand ratio, there must be at least 500 job postings for that role in the last year.'
                        }
                        bgColor={'#0c1f32'}
                      />
                      <GaugeMeter />
                      <CardTitle title={'Supply demand qualifier'} bgColor={'rgb(12, 31, 50)'} />
                      <LineChart type="supply demand" />
                    </div>
                    <div className="col-md-6">
                      <CardTitle
                        title={'Supply/demand ratio'}
                        details={
                          'This ratio represents the number of current workers available to fill the job postings that accrue over the course of a year. The higher the number, the more workers available to fill a job posting. The lower the number, the fewer workers available to fill the position and/or the greater number of vacancies for a given position over the course of a year. For an occupation to register a supply/demand ratio, there must be at least 500 job postings for that role in the last year.'
                        }
                        bgColor={'rgb(12, 31, 50)'}
                      />
                      <BarChart />
                      <div style={{ paddingTop: '6px' }}>
                        <CardTitle
                          title={'Location Quotient'}
                          details={
                            'Location quotients show the concentration of demand for an occupation in a selected location relative to the rest of the country. The location quotient data are normalized so that the country-wide quotient is equal to 1.0. Therefore a location quotient of 1.2, for example, indicates local demand that is 20% higher than the cross-country average (or 1.2 times the average concentration). Location quotients are always calculated for the last 12 months using the following formula: (total postings for occupation locally / total postings locally) / (total postings for occupation nationally / total postings nationally). For an occupation to register a location quotient, there must be at least 200 job postings for that role in that location the last year.            '
                          }
                          bgColor={'rgb(12, 31, 50)'}
                        />
                        <LineChart type="lq" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {criteriaContext.defaultCriteria.location.id !== '' && (
            <div className={`row d-flex flex-wrap ${s.donutContainer}`}>
              <div className={`${s.donutItems} col-md-6 col-lg-3`}>
                <CardTitle
                  title={'Requested Degree'}
                  details={
                    "Emsi Burning Glass parses the level of education requested job postings. Job postings that do not include a requested level of education are not included in this calculation. This calculation is based on the minimum level of education requested in the job posting. Sub-BA stands for sub-baccalaureate and includes high school or vocational training, post-high school certification, and Associate's degrees. BA stands for Bachelor's degree required. Post-grad includes postbaccalaureate credentials, Master's degrees, and doctoral degrees."
                  }
                  bgColor={'rgb(12, 31, 50)'}
                />
                <DonutChart type="degree" />
              </div>
              <div className={`${s.donutItems} col-md-6 col-lg-3`}>
                <CardTitle
                  title={'Years of experience'}
                  details={
                    'Emsi Burning Glass parses the years of experience requested job postings. Years of experience are standardized into a scale of 0 to 2 years, 3 to 5 years, or more than 5 years. There is a final category for when the job posting does specify how many years of experience are required for the position. Job postings are sorted according to the minimum years of experience requested in the text of the posting.'
                  }
                  bgColor={'rgb(12, 31, 50)'}
                />
                <DonutChart type="experience" />
              </div>

              <div className={`${s.donutItems} col-md-6 col-lg-3`}>
                <CardTitle
                  title={'Top Credentials'}
                  details={
                    'Emsi Burning Glass maintains a taxonomy of thousands of certifications. Certifications are parsed from job posting text and standardized to a single name in the certification taxonomy. For example, “Financial Risk Manager” and “FRM” are both standardized to “Financial Risk Manager (FRM).”'
                  }
                  bgColor={'rgb(12, 31, 50)'}
                />
                <BulletListCard type="topCredentials" />
              </div>
              <div className={`${s.donutItems} col-md-6 col-lg-3`}>
                <CardTitle
                  title={'Top Job Titles'}
                  details={
                    'The top job titles are provided only for the Finance Sector overall. Users can look at the top job titles in the finance sector overall and then dig deeper into these occupations by searching for them on the site'
                  }
                  bgColor={'rgb(12, 31, 50)'}
                />
                <BulletListCard type="topJobTitles" />
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  )
}

export default InteractiveMap
