import AdbIcon from '@mui/icons-material/Adb'
import MenuIcon from '@mui/icons-material/Menu'
import { Grid, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme, styled } from '@mui/material/styles'
import * as echarts from 'echarts'
import React, { useEffect, useState } from 'react'
import 'reactflow/dist/style.css'
import { BubbleChart, Card, CircleNodeChart, Link, MapLink, Table } from 'ui'
import { CardData, CardValue } from 'ui/Card/lib/interface'
import DonutCard from 'ui/DonutCard'
import { DonutChartProps } from 'ui/DonutCard/lib/interface'
import Map from 'ui/LayerCakeMap/index'
import { ColumnType, MockDataTypePurdue } from '../../../packages/ui/Table/interface'
import circleData from '../../../public/CircleData_Purdue.json'
import JsonData from '../../../public/LinkComponent_Purdue.json'
import Data from '../../../public/TableData_Purdue.json'
import Donut from 'ui/DonutCard'
import DonutJson from '../../../public/DonutPurdueData.json'
import 'reactflow/dist/style.css'
import mockDataEmbedPage from '../../../public/mockDataEmbedPage_Purdue.json'
import Modal from '../../../packages/ui/EmbedPageComponent/index'
import { nodes as NodeChart_Data } from '../../../public/NodeChart_Data'
import 'reactflow/dist/style.css'
import stateMapDataWorkersPerPostingRatio from '../data/stateMapDataWorkersPerPostingRatio.json'
import msaMapDataWorkersPerPosting from '../data/msaMapDataWorkersPerPosting.json'
import stateMapDataWorkersSupplyAndDemandRatio from '../data/stateMapDataWorkersSupplyAndDemandRatio.json'
import msaMapDataWorkersSupplyAndDemandRatio from '../data/msaMapDataWorkersSupplyAndDemandRatio.json'
import bubbleMockData from '../../../public/BubbleData_FnA.json'

const pages = ['Home', 'Products', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
  },
})

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
]

export default function Purdue() {
  const [data, setData] = useState<CardData[] | null>(null)
  const [formattedData, setFormattedData] = useState<CardValue[] | null>(null)
  const [selectedMap, setSelectedMap] = useState('statePurdue')
  const [selectedRichMap, setSelectedRichMap] = useState('stateMapPurdue')
  const [showMap, SetShowMap] = useState(false)
  const listData = JsonData['data']
  const hoverText = JsonData['hovertext']

  useEffect(() => {
    setData(circleData.data.ranking.buckets)
    setFormattedData(getFormattedData(circleData.data.ranking.buckets))
  }, [])

  const getFormattedData = (data: any): CardValue[] | null => {
    if (!data) {
      return null
    }

    const MapButton = styled(Button)({
      marginRight: '5px',
    })

    return [
      {
        key: 'Average Salary',
        value: data && data[1] ? data[1].median_salary : '',
        format: 'salary',
      },
      {
        key: 'Demand',
        value: data && data[1] ? data[1].posting_intensity : '',
        format: 'Demand',
      },
      {
        key: 'Growth',
        value: data && data[1] ? data[1].posting_intensity : '',
        format: 'Growth',
      },
      {
        key: 'skillsmatch',
        value: data && data[1] ? data[1].posting_intensity : '',
        format: 'skillsMatch',
      },
    ]
  }

  let mockData = Data.Data
  let total3: number = 0
  let i: number = 0

  let commonSkills2021Sum: number = Data.Data.reduce(
    (a: number, b) => a + parseInt(b.CommonSkills2021.replaceAll(',', '')),
    0
  )

  let commonSkills2022Sum: number = Data.Data.reduce(
    (a: number, b) => a + parseInt(b.CommonSkills2022.replaceAll(',', '')),
    0
  )

  for (i = 0; i < Data.Data.length; i++) {
    let mockData: MockDataTypePurdue = Data.Data[i]
    mockData.Change20212022 = (
      parseInt(Data.Data[i].CommonSkills2022.replaceAll(',', '')) -
      parseInt(Data.Data[i].CommonSkills2021.replaceAll(',', ''))
    ).toString()
    mockData.PercentChange =
      Math.round(
        (parseInt(mockData.Change20212022.replaceAll(',', '')) /
          parseInt(Data.Data[i].CommonSkills2021.replaceAll(',', ''))) *
          100
      ).toString() + '%'
  }

  const mockColumns: ColumnType[] = [
    {
      name: 'Description',
      title: 'DESCRIPTION',
      sortable: true,
      footer: 'Total ',
    },
    {
      name: 'CommonSkills2021',
      title: '2021 COMMON SKILLS',
      sortable: true,
      footer: commonSkills2021Sum.toLocaleString('en-de').replaceAll('.', ','),
    },
    {
      name: 'CommonSkills2022',
      title: '2022 COMMON SKILLS',
      sortable: true,
      footer: commonSkills2022Sum.toLocaleString('en-de').replaceAll('.', ','),
    },
    {
      name: 'PercentChange',
      title: '2021-2022 % CHANGE',
    },
  ]

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const [themeColor, setThemeColor] = React.useState('#ec407a')

  const handleChange = (event: SelectChangeEvent) => {
    setThemeColor(event.target.value as string)
  }

  const bubbleData = bubbleMockData.data

  const handleStateClick = () => {
    setSelectedMap('state')
  }

  const handleMSAClick = () => {
    setSelectedMap('msa')
  }

  const [alignment, setAlignment] = React.useState('statePurdue')
  const [purdueAlignment , setPurdueAlignment] = React.useState('stateMapPurdue')

  const handleMapTypeChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment != null) {
    setAlignment(newAlignment)
    setSelectedMap(newAlignment)
  }
}

const handlePurdueMapTypeChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
  if (newAlignment != null) {
  setPurdueAlignment(newAlignment)
  setSelectedRichMap(newAlignment)
  }
}

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
    <>
      <ThemeProvider theme={lightTheme}>
        <AppBar position="fixed">
          <Container maxWidth={false}>
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Purdue
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                    {page}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0, width: 'auto', color: 'white', backgroundColor: '#FFFFFF' }}>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={themeColor}
                    label="Theme Color"
                    onChange={handleChange}
                  >
                    <MenuItem value={'#757ce8'}>Primary</MenuItem>
                    <MenuItem value={'#009688'}>Teal</MenuItem>
                    <MenuItem value={'#ec407a'}>Pink</MenuItem>
                    <MenuItem value={'#673ab7'}>DeepPurple</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://png.pngtree.com/png-vector/20191103/ourmid/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_1947775.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Container maxWidth="xl" sx={{ mt: 10 }}>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
              Purdue University
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
            Data Science
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
            Purdue University is a public research university in West Lafayette, Indiana, and is the flagship campus of
            the Purdue University system. The university was founded in 1869 after Lafayette businessman John Purdue
            donated land and money to establish a college of science, technology, and agriculture in his name. The first
            classes were held on September 16, 1874, with six instructors and 39 students.
            <br />
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12} md={12} lg={4}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  backgroundColor: themeColor,
                  color: 'white',
                }}
              >
                <Typography variant="h5" sx={{ mb: 1.5 }}>
                  2021 COMMON SKILLS
                </Typography>
                <Typography variant="h3" sx={{ mb: 1.5 }}>
                  {commonSkills2021Sum.toLocaleString('en-de').replaceAll('.', ',')}
                </Typography>
                <Typography variant="h5" sx={{ mb: 1.5 }}>
                  {'83'}%
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  {'88'} of {'122'} students
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  backgroundColor: themeColor,
                  color: 'white',
                }}
              >
                <Typography variant="h5" sx={{ mb: 1.5 }}>
                  2020 COMMON SKILLS
                </Typography>
                <Typography variant="h3" sx={{ mb: 1.5 }}>
                  {commonSkills2022Sum.toLocaleString('en-de').replaceAll('.', ',')}
                </Typography>
                <Typography variant="h5" sx={{ mb: 1.5 }}>
                  {'87'}%
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  {'95'} of {'140'} students
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  backgroundColor: themeColor,
                  color: 'white',
                }}
              >
                <Typography variant="h5" sx={{ mb: 1.5 }}>
                  2019 COMMON SKILLS
                </Typography>
                <Typography variant="h3" sx={{ mb: 1.5 }}>
                  {commonSkills2022Sum.toLocaleString('en-de').replaceAll('.', ',')}
                </Typography>
                <Typography variant="h5" sx={{ mb: 1.5 }}>
                  {'55'}%
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  {'55'} of {'95'} students
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
            The main campus in West Lafayette offers more than 200 majors for undergraduates, over 70 masters and
            doctoral programs, and professional degrees in pharmacy and veterinary medicine. In addition, Purdue has 18
            intercollegiate sports teams and more than 900 student organizations. Purdue is known for its competitive
            engineering curriculum and large, well funded science, technology, engineering, and mathematics programs. It
            is a member of the Association of American Universities and the Big Ten Conference. <br />
            <br />
            Purdue is also known for its agricultural programs; it is the home of the College of Agriculture, the 1869
            Land-Grant College, and the School of Aviation and Transportation Technology. Purdue has a total student
            enrollment of 41,806, and an alumni base of more than 500,000. Purdue University offers various
            undergraduate and graduate programs in data analysis, data science, and related fields. Some of the popular
            programs are:
          </Typography>
          <ul>
            <li>Bachelor of Science in Data Science</li>
            <li>Master of Science in Business Analytics and Information Management</li>
            <li>Master of Science in Data Science</li>
            <li>Master of Science in Statistics and Data Science</li>
            <li>PhD in Statistics</li>
          </ul>
          The university also offers various courses in data analysis and related fields, such as:
          <ul>
            <li>Data Mining</li>
            <li>Machine Learning</li>
            <li>Big Data Analytics</li>
            <li>Statistical Analysis</li>
            <li>Data Visualization</li>
          </ul>
          Purdue University has several research centers and institutes focused on data analysis and related areas,
          including the Purdue University Data Mine, the Purdue Research in Machine Learning, and the Purdue Institute
          for Data Science. Students can also take advantage of various resources available on campus, such as the Data
          Science Consulting Service and the Data Visualization and Analytics Laboratory. Overall, Purdue University
          offers excellent opportunities for students interested in pursuing a career in data analysis or related
          fields.
          <Grid container spacing={1} sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12} md={4} lg={4}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 500,
                  backgroundColor: '#F54562',
                  color: 'white',
                }}
              >
                <Typography variant="h5" sx={{ mb: 1.5 }}>
                  2021 COMMON SKILLS
                </Typography>
                <Typography>
                  When it comes to university education, there are several skills that are considered to be crucial for
                  success in both academic and professional settings. The following are the top 10 common skills that
                  students are expected to develop during their university experience:
                </Typography>
                <ol>
                  <li>
                    Communication: The ability to communicate effectively is essential in all aspects of life. Students
                    are expected to develop their written, verbal, and nonverbal communication skills during their
                    university years.
                  </li>
                  <li>
                    Critical thinking: This skill involves the ability to analyze, evaluate, and synthesize information
                    to form logical conclusions and make informed decisions.
                  </li>
                  <li>
                    Problem-solving: Students are taught to identify problems and find effective solutions through
                    logical reasoning and critical analysis.
                  </li>
                  <li>
                    Time management: With multiple academic and social commitments, time management skills are crucial
                    to stay organized and on top of assignments and deadlines.
                  </li>
                </ol>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Table
                columns={mockColumns}
                data={mockData}
                title="Top 10 Common Skills"
                titleTextColor="black"
                headerFooterBgColor={themeColor}
                headerFooterTextColor="white"
                textColor="black"
                height="400px"
                width="1000px"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                Specialised skills
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                In addition to the common skills mentioned above, students are also expected to develop specialized
                skills that are specific to their field of study. The following are some of the most important skills
                that students are expected to develop during their university years:
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                Specialized skills are those that are specific to a particular field or industry and require a high
                level of expertise and knowledge. These skills are often developed through advanced education, training,
                and on-the-job experience, and are essential for success in many professions. For example, in the field
                of medicine, specialized skills such as surgical techniques, diagnostic procedures, and treatment
                protocols are crucial for providing quality care to patients. In the technology sector, specialized
                skills such as software development, data analysis, and cybersecurity are essential for creating and
                maintaining complex systems and applications. Other examples of specialized skills include legal
                expertise, financial analysis, marketing strategies, and engineering design. Developing specialized
                skills often requires a significant investment of time, effort, and resources, but can lead to rewarding
                and fulfilling careers. In fast-paced and constantly evolving job market, possessing specialized skills
                can set individuals apart from their peers and provide them with a competitive advantage.
              </Typography>
              <Typography variant="h5" sx={{ mt: 4 }}>
                Truck and Bus Driving
              </Typography>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <Typography>
                Truck and bus driving is a specialized field that requires a unique set of skills to ensure safe and
                efficient transportation of goods and people. One of the most crucial skills for truck and bus drivers
                is defensive driving, which involves anticipating and responding to potential hazards on the road. In
                addition to driving skills, truck and bus drivers must also have excellent communication skills to
                effectively communicate with dispatchers, other drivers, and passengers. They must be able to follow
                schedules and routes, manage their time efficiently, and comply with all applicable laws and
                regulations. Other important skills for truck and bus drivers include problem-solving abilities,
                mechanical knowledge for troubleshooting basic issues, and physical fitness to endure long hours of
                sitting and operating the vehicle. Truck and bus drivers are also expected to have a keen sense of
                responsibility towards their cargo and passengers, and to be able to remain calm and focused in
                stressful situations. Overall, truck and bus driving requires a unique combination of technical,
                physical, and interpersonal skills to ensure the safe and efficient transportation of goods and people.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Card
                title={data && data[1] ? data[1]?.name : ''}
                data={formattedData}
                bgColor={themeColor}
                height={'200.800px'}
                width={'352px'}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                Skills are essential for success in both personal and professional life. They are the foundation upon
                which we build our careers, pursue our passions, and achieve our goals. Whether it&apos;s technical
                expertise, interpersonal communication, problem-solving, or time management, skills are critical for
                getting things done and achieving meaningful results. In today&apos;s fast-paced and competitive job
                market, possessing a diverse range of skills is more important than ever before. Employers are looking
                for individuals who can bring a variety of skills to the table, including technical knowledge, critical
                thinking, creativity, and adaptability. Additionally, the ability to continually learn and develop new
                skills is becoming increasingly valuable as the job market evolves and new technologies and practices
                emerge. From improving job prospects to enhancing personal growth and development, the importance of
                skills cannot be overstated. By investing in the development of our skills, we can unlock our full
                potential, pursue our passions, and achieve success in both our personal and professional lives.
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                Cybersecurity
              </Typography>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <Typography>
                Cybersecurity is a critical and constantly evolving field that is concerned with protecting computer
                systems, networks, and sensitive data from unauthorized access, theft, or damage. With the increasing
                use of digital technology and the growing threat of cyber attacks, cybersecurity has become a top
                priority for businesses, organizations, and governments around the world. The field of cybersecurity
                encompasses a wide range of skills and disciplines, including network security, data encryption,
                vulnerability assessment, incident response, and threat intelligence. Professionals in this field must
                have a deep understanding of the latest threats and vulnerabilities, as well as the tools and techniques
                needed to protect against them. They must also be able to think critically, work well under pressure,
                and communicate effectively with stakeholders at all levels of the organization. As cyber attacks become
                more sophisticated and frequent, the demand for cybersecurity professionals is expected to continue to
                grow. In addition to technical skills, cybersecurity professionals must also have a strong sense of
                ethics and be committed to upholding privacy and security standards to ensure the safety and protection
                of digital assets. Overall, cybersecurity is a crucial field that plays a vital role in safeguarding the
                integrity and security of digital systems and data.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Card
                title={'Cybersecurity'}
                data={formattedData}
                bgColor={themeColor}
                height={'200.800px'}
                width={'352px'}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                Security skills are essential for ensuring the safety and protection of people, assets, and information.
                These skills encompass a broad range of practices and techniques, including physical security measures
                such as access control, surveillance, and perimeter defense, as well as digital security measures such
                as encryption, firewalls, and intrusion detection. In addition, security skills also include the ability
                to assess risks and vulnerabilities, develop security protocols and policies, and train personnel to
                maintain and implement security measures. Strong security skills are particularly important in
                industries such as banking, healthcare, and government, where sensitive information and assets are at
                risk of theft or compromise. However, security skills are also valuable in other industries and everyday
                life, such as protecting personal data and possessions. Developing and maintaining security skills
                requires ongoing training, education, and vigilance, as security threats are constantly evolving and
                changing. By investing in security skills, individuals and organizations can mitigate risks, protect
                valuable assets and information, and promote safety and trust.
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                Data Science
              </Typography>
            </Grid>
          </Grid>
          {/* generate FAQ block */}
          <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                Frequently Asked Questions
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                <b>What is a skill?</b>
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                A skill is a learned ability that allows you to perform a specific task or activity. Skills can be
                physical, such as riding a bike or typing on a keyboard, or mental, such as problem-solving or
                critical-thinking. Skills can also be social, such as teamwork or communication, or technical, such as
                computer programming or graphic design. Skills are often acquired through education, training, or
                experience, and they can be used to achieve a variety of goals, including personal, professional, and
                financial. In today&apos;s fast-paced and competitive job market, possessing a diverse range of skills
                is more important than ever before. Employers are looking for individuals who can bring a variety of
                skills to the table, including technical knowledge, critical thinking, creativity, and adaptability.
                Additionally, the ability to continually learn and develop new skills is becoming increasingly valuable
                as the job market evolves and new technologies and practices emerge. From improving job prospects to
                enhancing personal growth and development, the importance of skills cannot be overstated. By investing
                in the development of our skills, we can unlock our full potential, pursue our passions, and achieve
                success in both our personal and professional lives.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                <b>What are the different types of skills?</b>
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                There are many different types of skills, including soft, hard, and transferable skills. Soft skills are
                personal attributes that enable you to interact effectively and harmoniously with other people. Examples
                of soft skills include communication, teamwork, and problem-solving. Hard skills are specific, technical
                abilities that can be measured and evaluated, such as computer programming or graphic design.
                Transferable skills are skills that can be applied across different situations and environments.
                Examples of transferable skills include critical thinking, adaptability, and leadership. In addition to
                these general types of skills, there are also domain-specific skills, such as cybersecurity or data
                science. By developing a diverse range of skills, you can unlock your full potential and achieve success
                in both your personal and professional life.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                <b>Why are skills important?</b>
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                In today&apos;s fast-paced and competitive job market, possessing a diverse range of skills is more
                important than ever before. Employers are looking for individuals who can bring a variety of skills to
                the table, including technical knowledge, critical thinking, creativity, and adaptability. Additionally,
                the ability to continually learn and develop new skills is becoming increasingly valuable as the job
                market evolves and new technologies and practices emerge. From improving job prospects to enhancing
                personal growth and development, the importance of skills cannot be overstated. By investing in the
                development of our skills, we can unlock our full potential, pursue our passions, and achieve success in
                both our personal and professional lives.
              </Typography>
            </Grid>
          </Grid>
          {/* generate 3 x 3 grid with <Link> */}
          <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                Purdue Domains
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                Purdue Domains is a collection of online courses and programs that provide students with the opportunity
                to develop and demonstrate their skills in a variety of areas, including business, computer science,
                cybersecurity, data science, and more. Purdue Domains courses are designed to be flexible and
                accessible, allowing students to learn at their own pace and on their own schedule. Courses are
                available in a variety of formats, including online, in-person, and hybrid, and they can be completed in
                as little as one month. Purdue Domains courses are also available in a variety of languages, including
                English, Spanish, and Chinese. Through Purdue Domains, students can build a portfolio of skills that
                will help them achieve their educational and career goals. In addition, Purdue Domains courses can be
                taken for credit, which can be applied toward Purdue&apos;s undergraduate, graduate, and certificate
                programs. For more information about Purdue Domains, visit domains.purdue.edu.
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                <b>Business</b>
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                Purdue Domains offers a variety of business courses that provide students with the opportunity to
                develop and demonstrate their business skills. Courses are available in a variety of formats, including
                online, in-person, and hybrid, and they can be completed in as little as one month. Purdue Domains
                business courses are also available in a variety of languages, including English, Spanish, and Chinese.
                For more information about Purdue Domains business courses, visit domains.purdue.edu/business.
              </Typography>

              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                Courses are available in a variety of formats, including online, in-person, and hybrid, and they can be
                completed in as little as one month. Purdue Domains business courses are also available in a variety of
                languages, including English, Spanish, and Chinese. For more information about Purdue Domains business
                courses, visit domains.purdue.edu/business.
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Link
                cardHeader="Business Domains"
                remoteImage={'https://upload.wikimedia.org/wikipedia/commons/4/4e/DotOnline_gTLD_logo.svg'}
                listColor={themeColor}
                hoverText={hoverText}
                cardWidth={600}
                listData={listData}
                imageWidth={150}
                imageHeight={50}
                buttonHoverColor="grey"
                buttonBorder="8px"
                listMargin="7px"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                <b>Computer Science</b>
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                Purdue Domains offers a variety of computer science courses that provide students with the opportunity
                to develop and demonstrate their computer science skills. Courses are available in a va riety of
                formats, including online, in-person, and hybrid, and they can be completed in as little as one month.
                Purdue Domains computer science courses are also available in a variety of languages, including English,
                Spanish, and Chinese. For more information about Purdue Domains computer science courses, visit
                domains.purdue.edu/computer-science.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <ImageList sx={{ width: 700, height: 450 }} cols={3} rowHeight={230}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                  Workforce and demand - 2021
                </Typography>
              </Grid>
              <div>
                <Typography variant="body1" sx={{ mt: 2, mb: 2, textAlign: 'justify' }}>
                  In the context of employment and the labor market, "workforce and demand" refer to the relationship
                  between the number of available workers and the number of job openings. When there are more job
                  openings than there are available workers to fill them, it is known as a "tight labor market," which
                  can lead to higher wages, better benefits, and other incentives for workers. Conversely, when there
                  are more workers than there are job openings, it is known as a "slack labor market," which can lead to
                  lower wages and fewer benefits for workers.
                  <br />
                  <br />
                  Employers are constantly trying to balance their workforce with the demand for their products or
                  services. If the demand for a product or service increases, employers may need to hire more workers to
                  meet the demand. Similarly, if the demand decreases, employers may need to reduce their workforce to
                  remain profitable.
                </Typography>
                <Box sx={{ ml: '25%', mt: 5 }}>
                  <Box sx={{ display: 'flex', m: 'auto', width: '70%' }}>
                    <ToggleButtonGroup
                      color="primary"
                      value={alignment}
                      exclusive
                      onChange={handleMapTypeChange}
                      aria-label="Platform"
                    >
                      <ToggleButton value="statePurdue">State</ToggleButton>
                      <ToggleButton value="msaPurdue">MSA</ToggleButton>
                    </ToggleButtonGroup>
                    {}
                  </Box>
                    <Box sx={{ display: 'flex', m: 'auto', width: '100%', pt: 2 }}>
                    <Map Layer={selectedMap} LayerCakeMapColor={['#645CBB','#A084DC','#BFACE2','#EBC7E6']} LayerCakeMapStateData={stateMapDataWorkersPerPostingRatio.mockDataForStatePurdue} LayerCakeMapMsaData={msaMapDataWorkersPerPosting.msaWorkerRatio} visualMap={true}/>
                    </Box>
                </Box>
              </div>
              <Typography variant="body1" sx={{ mt: 2, mb: 2, textAlign: 'justify' }}>
                Workers may also respond to changes in demand by changing their skills or moving to a different industry
                or location where demand is higher. For example, workers may choose to pursue education or training in
                fields where demand is high, or they may move to a region where there are more job opportunities.
                <br />
                <br />
                Understanding the relationship between workforce and demand is important for both employers and workers.
                Employers need to be able to recruit and retain skilled workers to meet the demand for their products or
                services, while workers need to be able to find job opportunities in fields where demand is high.
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12} md={8} lg={8}>
              <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                Job Postings / Level of Experience
              </Typography>
              <Typography sx={{ textAlign: 'justify' }}>
                Purdue is a university that offers a tool called the "Purdue Job Posting Analysis Tool," which can help
                employers parse the level of experience requested in job postings. The tool uses natural language
                processing (NLP) and machine learning algorithms to analyze job postings and identify the level of
                experience required for a particular job. The tool analyzes the text of job postings and identifies
                keywords and phrases that are commonly associated with different levels of experience, such as
                "entry-level," "mid-level," and "senior-level." Based on these keywords and phrases, the tool can assign
                a level of experience to the job posting. <br />
                <br />
                By using the Purdue Job Posting Analysis Tool, employers can ensure that their job postings accurately
                reflect the level of experience they are seeking in a candidate. This can help to attract qualified
                candidates and streamline the recruitment process. Overall, the Purdue Job Posting Analysis Tool is a
                valuable resource for employers who want to ensure that their job postings are clear and accurate, and
                that they are effectively targeting the level of experience they need for a particular job.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <DonutCard
                width={400}
                hoverText={'Purdue parses the level of experience requested jobpostings'}
                header={'Experience'}
                data={DonutJson as DonutChartProps}
              />
            </Grid>
          </Grid>
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
            <br /> Overall, the Texas Workforce Development Board plays a critical role in supporting economic growth
            and job creation in Texas by developing and implementing effective workforce development strategies and
            initiatives.
          </Typography>
          <Box sx={{ ml: '25%', mt: 5 }}>
            <Box sx={{ display: 'flex', m: 'auto', width: '70%' }}>
              <ToggleButtonGroup
                color="primary"
                value={purdueAlignment}
                exclusive
                onChange={handlePurdueMapTypeChange}
                aria-label="Platform"
              >
                <ToggleButton value="stateMapPurdue">State</ToggleButton>
                <ToggleButton value="msaMapPurdue">MSA</ToggleButton>
              </ToggleButtonGroup>
              {}
            </Box>
              <Box sx={{ display: 'flex', m: 'auto', width: '100%', pt: 2 }}>
                  <Map Layer={selectedRichMap} LayerCakeMapColor={['#454545','#FF6000','#FFA559','#FFE6C7']} LayerCakeMapStateData={stateMapDataWorkersSupplyAndDemandRatio.SupplyDemandRatio} LayerCakeMapMsaData={msaMapDataWorkersSupplyAndDemandRatio.SupplyDemandRatio} visualMap={false}/>
              </Box>
          </Box>
          <Typography variant="body1" sx={{ mt: 2, mb: 2, textAlign: 'justify' }}>
            Developing and implementing a statewide workforce development plan that aligns with the needs of Texas
            employers and industries. Overseeing the distribution of federal and state funding for workforce development
            programs and services. Providing training and education programs that help Texas workers acquire the skills
            and knowledge needed to succeed in high-demand industries. Collaborating with employers, labor
            organizations, educational institutions, and other stakeholders to develop and implement innovative
            workforce development solutions. Conducting research and analysis on labor market trends and workforce needs
            to inform workforce development strategies and initiatives.
          </Typography>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
              Job Postings / Demand
            </Typography>
          </Grid>
          <div>
            <Typography variant="body1" sx={{ mt: 2, mb: 2, textAlign: 'justify' }}>
              Job postings are a way for employers to communicate to potential job candidates that there is a demand for
              their skills and expertise in the job market. Job postings provide details about the job title, job
              description, required qualifications, responsibilities, and compensation package. They are typically
              posted on job boards, company websites, and other online platforms. <br />
              <br /> The number of job postings can indicate the level of demand for certain types of jobs or skills in
              the labor market. If there are many job postings for a particular job title or skill set, it may suggest
              that there is a high demand for those skills in the job market. Conversely, if there are few job postings
              for a particular job title or skill set, it may suggest that there is a lower demand for those skills in
              the job market.
            </Typography>
            <Box sx={{ pl: 50 }}>
              <BubbleChart
                data={bubbleData}
                title=""
                bgColor="white"
                titleColor="rgb(254,217,165)"
                toolTipContent="Job Postings"
                circleTextColor="#f8fafc"
                minColorShade="#7dd3fc"
                maxColorShade="#0369a1"
                tooltipBgColor="#075985"
              />
            </Box>
          </div>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mt: -20, mb: 2 }}>
              Texas Workforce Development Board
            </Typography>
          </Grid>
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
            The Texas Workforce Development Board (TWDB) is a state agency in Texas that oversees and coordinates
            workforce development initiatives throughout the state. The board is responsible for identifying and
            addressing the workforce needs of Texas employers, as well as providing training and education to help Texas
            workers acquire the skills and knowledge needed to succeed in today's job market. <br />
            <br /> Overall, the Texas Workforce Development Board plays a critical role in supporting economic growth
            and job creation in Texas by developing and implementing effective workforce development strategies and
            initiatives.
          </Typography>
          <Box sx={{ ml: 20, mt: -10 }}>
            <MapLink state="Texas" stateId="48" mapColor="#0284c7" mapHoverColor="powderblue" />
          </Box>
          <div style={{ paddingBottom: '25px' }}>
            <h5 style={{ margin: '10px 10px 10px 10px' }}>Jobs by Nice Cyber Security Workforce</h5>
            <button
              className="btn button btn-outline-secondary"
              onClick={handleClick}
              style={{ margin: '0 10px 0 10px', color: 'black', fontWeight: '500' }}
            >
              Cyber Defense Analyst
            </button>
            <button
              className="btn button btn-outline-secondary"
              onClick={handleClick}
              style={{ margin: '0 10px 0 10px', color: 'black', fontWeight: '500' }}
            >
              Cyber Defense Infrastructure Support Specialist
            </button>
            <Modal
              title={filteredData.Title}
              body={filteredData.Description}
              onClose={() => setShow(false)}
              show={show}
              tabNames={tabNames}
              tabContent={filteredData.TabContents}>
            </Modal>
          </div>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Career Pathway
            </Typography>
          </Grid>
          <div>
            <Typography variant="body1" sx={{ mt: 2, mb: 2, textAlign: 'justify' }}>
              A career pathway is a structured series of education and training programs, job positions, and other work
              experiences that provide individuals with the skills and knowledge needed to progress in a particular
              career field. The pathway typically includes entry-level positions, mid-level positions, and advanced
              positions, each of which requires increasing levels of expertise and responsibility. A career pathway may
              also include opportunities for certification, licensing, or continuing education to ensure that
              individuals stay current with industry trends and developments. <br />
              <br /> Career pathways are designed to help individuals make informed choices about their careers and to
              provide a clear path for advancement. They are often used in workforce development programs, where they
              are used to guide individuals who are entering or transitioning to a particular industry or career field.
              By following a career pathway, individuals can develop the skills, experience, and knowledge they need to
              succeed in their chosen field and achieve their career goals.
            </Typography>
          </div>
          <div style={{ height: '750px', width: '100%', paddingBottom: '10px' }}>
            <CircleNodeChart nodes={NodeChart_Data} />
          </div>
        </Container>
        <Grid item xs={10}></Grid>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            color: '#FFFFFF',
            backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#757ce8' : '#757ce8'),
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">Footer section</Typography>
            <Typography variant="body2">
              {'Copyright © '}
              Skills domains {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  )
}
