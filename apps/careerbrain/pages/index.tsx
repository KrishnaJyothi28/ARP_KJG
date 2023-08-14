import { Box, Grid, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import 'reactflow/dist/style.css'
import { BubbleChart, Card, Link, MapLink, Table, CircleNodeChart } from 'ui'
import { CardData, CardValue } from 'ui/Card/lib/interface'
import DonutCard from 'ui/DonutCard'
import Map from 'ui/LayerCakeMap/index'
import { ColumnType } from 'ui/Table/interface'
import { MockDataTypeCareerBrain } from '../../../packages/ui/Table/interface'
import Data from '../../../public/TableData_CareerBrain.json'
import { DonutChartProps } from 'ui/DonutCard/lib/interface'
import DonutJson from '../../../public/DonutData.json'
import { nodes as NodeChart_Data } from '../../../public/NodeChart_Data'
import 'reactflow/dist/style.css'
import circleData from '../../../public/CircleData.json'
import JsonData from '../../../public/LinkComponent_CareerBrain.json'
import mockDataEmbedPage from '../../../public/mockDataEmbedPage_CareerBrain.json'
import Modal from '../../../packages/ui/EmbedPageComponent/index'
import stateMapDataWorkersPerPostingRatio from '../data/stateMapDataWorkersPerPostingRatio.json'
import stateMapDataWorkersDemandAndSupplyRatio from '../data/stateMapDataWorkersDemandAndSupplyRatio.json'
import msaMapDataWorkersPerPostingRatio from '../data/msaMapDataWorkersPerPostingRatio.json'
import msaMapDataWorkersDemandAndSupplyRatio from '../data/msaMapDataWorkersDemandAndSupplyRatio.json'
import bubbleMockData from '../../../public/BubbleData_CareerBrain.json'

function CareerBrainDemo() {
  const [data, setData] = useState<CardData[] | null>(null)
  const [formatteddata, setformattedData] = useState<CardValue[] | null>(null)
  const listData = JsonData['data']
  const hoverText = JsonData['hovertext']

  useEffect(() => {
    setData(circleData.data.ranking.buckets)
    setformattedData(getFormattedData(circleData.data.ranking.buckets))
  }, [])

  const getFormattedData = (data: any): CardValue[] | null => {
    if (!data) {
      return null
    }

    return [
      {
        key: 'Average Salary',
        value: data && data[0] ? data[0].median_salary : 0,
        format: 'salary',
      },
      {
        key: 'Demand',
        value: data && data[0] ? data[0].posting_intensity : 0,
        format: 'Demand',
      },
      {
        key: 'Growth',
        value: data && data[0] ? data[0].posting_intensity : 0,
        format: 'Growth',
      },
      {
        key: 'skillsmatch',
        value: data && data[0] ? data[0].posting_intensity : 0,
        format: 'skillsMatch',
      },
    ]
  }

  let mockData = Data.Data
  let change20092013Sum: number = 0

  let jobs2009Sum: number = Data.Data.reduce((a: number, b) => a + parseInt(b.Jobs2009.replaceAll(',', '')), 0)

  let jobs2013Sum: number = Data.Data.reduce((a: number, b) => a + parseInt(b.Jobs2013.replaceAll(',', '')), 0)

  let index: number = 0
  for (index = 0; index < Data.Data.length; index++) {
    let mockData: MockDataTypeCareerBrain = Data.Data[index]
    mockData.Change20092013 = (
      parseInt(Data.Data[index].Jobs2013.replaceAll(',', '')) - parseInt(Data.Data[index].Jobs2009.replaceAll(',', ''))
    ).toLocaleString()
    change20092013Sum = change20092013Sum + parseInt(mockData.Change20092013.replaceAll(',', ''))
    mockData.PercentChange =
      Math.round(
        (parseInt(mockData.Change20092013.replaceAll(',', '')) /
          parseInt(Data.Data[index].Jobs2009.replaceAll(',', ''))) *
          100
      ).toLocaleString() + '%'
  }

  const mockColumns: ColumnType[] = [
    {
      name: 'Description',
      title: 'DESCRIPTION',
      sortable: true,
      footer: 'Total ',
    },
    {
      name: 'Jobs2009',
      title: '2009 JOBS',
      sortable: true,
      footer: jobs2009Sum.toLocaleString('en-de').replaceAll('.', ','),
    },
    {
      name: 'Jobs2013',
      title: '2013 JOBS',
      sortable: true,
      footer: jobs2013Sum.toLocaleString('en-de').replaceAll('.', ','),
    },
    {
      name: 'Change20092013',
      title: '2009-2013 CHANGE',
      sortable: true,
      footer: change20092013Sum.toLocaleString('en-de').replaceAll('.', ','),
    },
    {
      name: 'PercentChange',
      title: '2009-2013 % CHANGE',
      sortable: true,
    },
    {
      name: 'LocationQuotient',
      title: '2013 LOCATION QUOTIENT',
      sortable: true,
    },
  ]

  const [alignment, setAlignment] = React.useState('state')
  const [mapAlignment, setMapAlignment] = React.useState('stateMap')
  const [selectedMap, setSelectedMap] = useState('state')
  const [selectedRichMap, setSelectedRichMap] = useState('stateMap')

  const handleMapTypeChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if(newAlignment != null){
      setAlignment(newAlignment)
      setSelectedMap(newAlignment)
    }
    
  }
 
  const handleRichMapTypeChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if(newAlignment != null) {
      setMapAlignment(newAlignment)
      setSelectedRichMap(newAlignment)
    }
  }


  const bubbleData = bubbleMockData.data

  const handleStateMapClick = () => {
    setSelectedMap('state')
  }

  const handleMSAMapClick = () => {
    setSelectedMap('msa')
  }

  const [show, setShow] = useState(false)

  const [filteredData, setfilteredData] = useState({
    Title: '',
    Description: '',
    TabContents: ['Tab 1 content', 'Tab 2 content', 'Tab 3 data', 'Tab 4 data'],
  })

  const tabNames = mockDataEmbedPage.TabNames

  const Mockdata = mockDataEmbedPage.Data

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setShow(true)
    const buttonText = event.currentTarget.textContent
    const NewData = Mockdata.find((item) => item.Title === buttonText)
    setfilteredData(NewData !== undefined ? NewData : filteredData)
  }

  return (
    <div>
      <AppBar style={{ background: '#1e88e5' }} position="static">
        <Container maxWidth="xl" sx={{ m: 0 }}>
          <Toolbar disableGutters>
            <Typography
              variant="h1"
              noWrap
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontSize: '2rem',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Career Brain
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Career Brain
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ p: 4 }}>
        <Typography gutterBottom variant="h4" component="div">
          Occupational Outlook Handbook
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify', p: 1 }}>
          The Occupational Outlook Handbook (OOH) is a comprehensive resource published by the U.S. Bureau of Labor
          Statistics (BLS) that provides information about hundreds of different occupations. The OOH includes
          information such as job duties, education and training requirements, median salaries, and job outlooks for
          various occupations. It is designed to help individuals make informed decisions about their careers and to
          provide valuable information to job seekers, students, and career counselors. The OOH is regularly updated to
          reflect changes in the job market and to provide the most accurate and up-to-date information possible. It is
          available online and in print and is widely used by individuals and organizations across the country. The OOH
          is an invaluable resource for anyone interested in exploring different career paths and making informed
          decisions about their education and career goals.
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" sx={{ p: 4 }}>
          <Card
            title={data && data[3] ? data[3]?.name : ''}
            data={[
              {
                key: 'Average Salary',
                value: data && data[3] && data[3].median_salary ? data[3].median_salary.toString() : '0',
                format: 'salary',
              },
              {
                key: 'Demand',
                value: data && data[3] && data[3].posting_intensity ? data[3].posting_intensity.toString() : '0',
                format: 'Demand',
              },
              {
                key: 'Growth',
                value: data && data[3] && data[3].posting_intensity ? data[3].posting_intensity.toString() : '0',
                format: 'Growth',
              },
              {
                key: 'skillsmatch',
                value: data && data[3] && data[3].posting_intensity ? data[3].posting_intensity.toString() : '0',
                format: 'skillsMatch',
              },
            ]}
            bgColor={'#0097a7'}
            // bgColor={
            //   'linear-gradient(45deg,  rgb(230, 29, 29), rgb(120, 33, 111),  rgb(120, 38, 145), rgb(157, 42, 192), rgb(192, 32, 240))'
            // }
            height={'200.800px'}
            width={'352px'}
          />
          <Card
            title={data && data[1] ? data[1]?.name : ''}
            data={formatteddata}
            bgColor={'#26a69a'}
            // bgColor={
            //   'linear-gradient(45deg,  rgb(230, 29, 29), rgb(120, 33, 111),  rgb(120, 38, 145), rgb(157, 42, 192), rgb(192, 32, 240))'
            // }
            height={'200.800px'}
            width={'352px'}
          />
          <Card
            title={data && data[2] ? data[2]?.name : ''}
            data={[
              {
                key: 'Average Salary',
                value: data && data[2] && data[2].median_salary ? data[2].median_salary.toString() : '0',
                format: 'salary',
              },
              {
                key: 'Demand',
                value: data && data[2] && data[2].posting_intensity ? data[2].posting_intensity.toString() : '0',
                format: 'Demand',
              },
              {
                key: 'Growth',
                value: data && data[2] && data[2].posting_intensity ? data[2].posting_intensity.toString() : '0',
                format: 'Growth',
              },
              {
                key: 'skillsmatch',
                value: data && data[2] && data[2].posting_intensity ? data[2].posting_intensity.toString() : '0',
                format: 'skillsMatch',
              },
            ]}
            bgColor={'#5c6bc0'}
            // bgColor={
            //   'linear-gradient(45deg,  rgb(230, 29, 29), rgb(120, 33, 111),  rgb(120, 38, 145), rgb(157, 42, 192), rgb(192, 32, 240))'
            // }
            height={'200.800px'}
            width={'352px'}
          />
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify', p: 1 }}>
          The OOH is a valuable resource for students who are exploring different career paths and trying to determine
          which occupations align with their interests and skills. It provides detailed information about job duties,
          work environments, required education and training, and potential earnings for hundreds of different
          occupations. This information can help students make informed decisions about their college majors and career
          goals, and can also help them determine which internships, part-time jobs, or volunteer opportunities can
          provide relevant experience and help them build the skills they need to succeed in their chosen field. In
          addition to students, the OOH is also used by job seekers, career counselors, and human resources
          professionals to identify job trends, assess the availability of different types of jobs in various
          industries, and to plan and prepare for career transitions. It is a valuable resource for anyone who is
          seeking to advance their career or make a change in their work life. Overall, the Occupational Outlook
          Handbook is an essential resource for anyone who is interested in exploring different career paths or learning
          more about the job market. Its comprehensive information and regular updates make it an authoritative and
          trustworthy source of information about the world of work.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify', p: 1 }}>
          Overall, the Occupational Outlook Handbook is an essential resource for anyone who is interested in exploring
          different career paths or learning more about the job market. Its comprehensive information and regular
          updates make it an authoritative and trustworthy source of information about the world of work.
        </Typography>
      </Container>

      <Container maxWidth="xl" sx={{ p: 1 }}>
        <Typography gutterBottom variant="h4" component="div">
          Growing Occupations
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify', p: 1 }}>
          In 2013, Detroit declared bankruptcy and became the media’s go-to example for struggling cities. But despite
          great difficulty, it has managed over $2.4 billion in investment and development since January of that year.
          And in many key economic categories—including gross domestic product, private sector job growth, and per
          capita income—the Detroit region is now outperforming national averages. So how did Detroit do it? How do you
          attract, retain, and expand industry in a region associated with economic collapse? How does an entire region
          fail forward?
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ p: 4 }}>
          <Table
            columns={mockColumns}
            data={mockData}
            title="Top 10 Fastest growing occupations, Detroit Region"
            titleTextColor="#424242"
            headerFooterBgColor="#1e88e5"
            headerFooterTextColor="white"
            textColor="#424242"
            height="800px"
            sourceText="Source: EMSI"
          />
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify', p: 1 }}>
          By showcasing this data, Detroit tells a compelling story about its economic recovery and also improves the
          image of its regional workforce, which has historically been steeped in traditional manufacturing.
        </Typography>
      </Container>

      <Container maxWidth="xl" sx={{ p: 1 }}>
        <Typography gutterBottom variant="h4" component="div">
          Similar Occupations
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify', p: 1 }}>
          The Occupational Outlook Handbook not only provides information about specific occupations, but it also
          includes a section on similar occupations. This section is helpful for individuals who are exploring different
          career paths and want to learn about related occupations that may require similar skills or have similar job
          duties. The similar occupations section provides information about job titles, median salaries, required
          education and training, and job outlooks for a range of occupations that are related to the original
          occupation of interest.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify', p: 1 }}>
          For example, if a student is interested in becoming a physical therapist, they can use the similar occupations
          section to learn about related occupations such as occupational therapist, speech-language pathologist, and
          recreational therapist. This information can help the student explore different career paths and determine
          which occupation aligns best with their interests and skills.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            '& > :not(style)': {
              m: 1,
              width: 'auto',
              height: 'auto',
            },
          }}
        >
          <Paper variant="outlined" sx={{ p: 2 }} elevation={0}>
            <Typography gutterBottom variant="h5" component="div">
              Financial Analyst
            </Typography>
            <Link
              cardHeader="Knowledge Domains"
              localImage={'logo.png'}
              listColor="powderblue"
              hoverText={hoverText}
              cardWidth={500}
              listData={listData}
              imageWidth={200}
              imageHeight={100}
              buttonHoverColor="deepskyblue"
              buttonBorder="8px"
              listMargin="7px"
            />
          </Paper>
        </Box>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
            Texas Workforce Development Board
          </Typography>
        </Grid>
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
          The Texas Workforce Development Board (TWDB) is a state agency in Texas that oversees and coordinates
          workforce development initiatives throughout the state. The board is responsible for identifying and
          addressing the workforce needs of Texas employers, as well as providing training and education to help Texas
          workers acquire the skills and knowledge needed to succeed in today's job market. <br />
          <br /> Overall, the Texas Workforce Development Board plays a critical role in supporting economic growth and
          job creation in Texas by developing and implementing effective workforce development strategies and
          initiatives.
        </Typography>
        <Box sx={{ ml: 20, mt: -10, mb: -10 }}>
          <MapLink state="Texas" stateId="48" mapColor="#0e7490" mapHoverColor="powderblue" />
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify', p: 1 }}>
          In addition to helping individuals explore different career paths, the similar occupations section can also be
          useful for job seekers who are looking for alternative job opportunities. By exploring related occupations,
          job seekers may discover new career paths that they had not previously considered, or they may find job
          openings in related fields that match their skills and qualifications.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify', p: 1 }}>
          Overall, the similar occupations section of the Occupational Outlook Handbook is a valuable resource for
          anyone who is exploring different career paths or looking for alternative job opportunities. It can help
          individuals expand their career options and make informed decisions about their education and career goals.
        </Typography>
        <h5 style={{ margin: '10px 10px 10px 10px' }}>Jobs by Nice Cyber Security Workforce</h5>
        <button
          className="btn button btn-outline-secondary"
          onClick={handleClick}
          style={{ margin: '0 10px 0 10px', color: 'black', fontWeight: '500' }}
        >
          Knowledge Manager
        </button>
        <button
          className="btn button btn-outline-secondary"
          onClick={handleClick}
          style={{ margin: '0 10px 0 10px', color: 'black', fontWeight: '500' }}
        >
          System Administrator
        </button>
        <Modal
          title={filteredData.Title}
          body={filteredData.Description}
          onClose={() => setShow(false)}
          show={show}
          tabNames={tabNames}
          tabContent={filteredData.TabContents}>
        </Modal>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
            Average Salary
          </Typography>
        </Grid>
        <div>
          <Typography variant="body1" sx={{ mt: 2, mb: 2, textAlign: 'justify' }}>
            The average salary varies depending on factors such as industry, job title, level of experience, location,
            and company size. In the United States, the average annual salary for all occupations is around $56,000,
            according to the Bureau of Labor Statistics. However, this can vary significantly by occupation. For
            example, the average annual salary for a software developer is around $110,000, while the average salary for
            a registered nurse is around $77,000. <br />
            <br /> It's important to note that salaries can also vary by location, with some cities and regions offering
            higher average salaries due to a higher cost of living or a strong demand for certain industries or job
            titles. Overall, determining an average salary can be difficult due to the many factors that can impact pay.
            Job seekers can research salaries for specific job titles and industries using resources such as salary
            databases, industry associations, and job postings.
          </Typography>
          <Box sx={{ pl: 50 }}>
            <BubbleChart
              data={bubbleData}
              title=""
              bgColor="white"
              titleColor="rgb(254,217,165)"
              toolTipPrefix="$"
              toolTipSuffix="k"
              toolTipContent="Salary"
              circleTextColor="#f8fafc"
              minColorShade="#2dd4bf"
              maxColorShade="#115e59"
              tooltipBgColor="#134e4a"
            />
          </Box>
        </div>

        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
            Statewise Workers Demand & Supply
          </Typography>
        </Grid>
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
          The Texas Workforce Development Board (TWDB) is a state agency in Texas that oversees and coordinates
          workforce development initiatives throughout the state. The board is responsible for identifying and
          addressing the workforce needs of Texas employers, as well as providing training and education to help Texas
          workers acquire the skills and knowledge needed to succeed in today's job market. <br />
          <br /> Overall, the Texas Workforce Development Board plays a critical role in supporting economic growth and
          job creation in Texas by developing and implementing effective workforce development strategies and
          initiatives.
        </Typography>
        <Box sx={{ ml: '25%', mt: 5 }}>
          <Box sx={{ display: 'flex', m: 'auto', width: '80%' }}>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleMapTypeChange}
              aria-label="Platform"
            >
              <ToggleButton value="state">State</ToggleButton>
              <ToggleButton value="msa">MSA</ToggleButton>
            </ToggleButtonGroup>
            {}
          </Box>
          <Box sx={{ display: 'flex', m: 'auto', width: '100%', pt: 2 }}>
                  <Map Layer={selectedMap} LayerCakeMapColor={['#867070','#D5B4B4','#E4D0D0','#F5EBEB']} LayerCakeMapStateData={stateMapDataWorkersPerPostingRatio.MockDataforStateCareerBrain} LayerCakeMapMsaData={msaMapDataWorkersPerPostingRatio.msaWorkerRatio} visualMap={true}/>
          </Box>
        </Box>
      </Container>
      <Container maxWidth="xl" sx={{ p: 1 }}>
        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Grid item xs={12} md={8} lg={8}>
            <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
              Job Postings / Level of Experience
            </Typography>
            <Typography sx={{ textAlign: 'justify' }}>
              Job postings typically include a description of the job duties, required qualifications, and preferred
              experience level. Employers may specify different levels of experience based on the complexity of the job
              tasks and the amount of responsibility the candidate will have. Common levels of experience that may be
              included in job postings are: Entry-level: This is typically for candidates who are new to the industry or
              have limited work experience. Employers may require a certain level of education, but may not require
              previous work experience in the field. <br />
              <br />
              Mid-level: This is for candidates who have some experience in the industry and have a track record of
              success. Employers may require a certain number of years of experience in the field, as well as specific
              skills and qualifications. Senior-level: This is for candidates who have extensive experience in the
              industry and have demonstrated strong leadership and management skills. Employers may require a high level
              of education, such as a master's degree, as well as a significant amount of experience in the field.
              <br />
              <br />
              It's important to note that the level of experience required for a job may vary depending on the employer,
              the specific job duties, and the industry. Job seekers should carefully review job postings to determine
              if they meet the required qualifications and experience level before applying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Box sx={{ p: 5 }}>
              <DonutCard
                width={400}
                hoverText={'Career Brain parses the level of education requested jobpostings'}
                header={'Degree'}
                data={DonutJson as DonutChartProps}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl" sx={{ p: 1 }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Workforce and demand - 2021
          </Typography>
        </Grid>
        <div>
          <Typography variant="body1" sx={{ mt: 2, mb: 2, textAlign: 'justify' }}>
            In the context of employment and the labor market, "workforce and demand" refer to the relationship between
            the number of available workers and the number of job openings. When there are more job openings than there
            are available workers to fill them, it is known as a "tight labor market," which can lead to higher wages,
            better benefits, and other incentives for workers. Conversely, when there are more workers than there are
            job openings, it is known as a "slack labor market," which can lead to lower wages and fewer benefits for
            workers.
            <br />
            <br />
            Employers are constantly trying to balance their workforce with the demand for their products or services.
            If the demand for a product or service increases, employers may need to hire more workers to meet the
            demand. Similarly, if the demand decreases, employers may need to reduce their workforce to remain
            profitable.
          </Typography>
        </div>
        <Box sx={{ ml: '25%', mt: 5 }}>
          <Box sx={{ display: 'flex', m: 'auto', width: '80%' }}>
            <ToggleButtonGroup
              color="primary"
              value={mapAlignment}
              exclusive
              onChange={handleRichMapTypeChange}
              aria-label="Platform"
            >
              <ToggleButton value="stateMap">State</ToggleButton>
              <ToggleButton value="msaMap">MSA</ToggleButton>
            </ToggleButtonGroup>
            {}
          </Box>
          <Box sx={{ display: 'flex', m: 'auto', width: '100%', pt: 2 }}>
              <Map Layer={selectedRichMap} LayerCakeMapColor={['#0C134F','#1D267D','#5C469C','#D4ADFC']} LayerCakeMapStateData={stateMapDataWorkersDemandAndSupplyRatio.SupplyDemandRatio} LayerCakeMapMsaData={msaMapDataWorkersDemandAndSupplyRatio.SupplyDemandRatio} visualMap={false}/>
          </Box>
        </Box>
        <div>
          <Typography variant="body1" sx={{ mt: 2, mb: 2, textAlign: 'justify' }}>
            In the context of employment and the labor market, "workforce and demand" refer to the relationship between
            the number of available workers and the number of job openings. When there are more job openings than there
            are available workers to fill them, it is known as a "tight labor market," which can lead to higher wages,
            better benefits, and other incentives for workers. Conversely, when there are more workers than there are
            job openings, it is known as a "slack labor market," which can lead to lower wages and fewer benefits for
            workers.
            <br />
            <br />
            Employers are constantly trying to balance their workforce with the demand for their products or services.
            If the demand for a product or service increases, employers may need to hire more workers to meet the
            demand. Similarly, if the demand decreases, employers may need to reduce their workforce to remain
            profitable.
          </Typography>
        </div>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
            Career Pathway
          </Typography>
        </Grid>
        <div>
          <Typography variant="body1" sx={{ mt: 2, mb: 2, textAlign: 'justify' }}>
            A career pathway is a structured series of education and training programs, job positions, and other work
            experiences that provide individuals with the skills and knowledge needed to progress in a particular career
            field. The pathway typically includes entry-level positions, mid-level positions, and advanced positions,
            each of which requires increasing levels of expertise and responsibility. A career pathway may also include
            opportunities for certification, licensing, or continuing education to ensure that individuals stay current
            with industry trends and developments. <br />
            <br /> Career pathways are designed to help individuals make informed choices about their careers and to
            provide a clear path for advancement. They are often used in workforce development programs, where they are
            used to guide individuals who are entering or transitioning to a particular industry or career field. By
            following a career pathway, individuals can develop the skills, experience, and knowledge they need to
            succeed in their chosen field and achieve their career goals.
          </Typography>
          <div style={{ height: '750px', width: '100%', paddingBottom: '10px' }}>
            <CircleNodeChart nodes={NodeChart_Data} />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CareerBrainDemo
