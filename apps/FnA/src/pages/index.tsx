import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'next/image'
import Link from 'next/link'
import interactiveMapImage from '../assets/homeMap.svg'
import interactiveMapPageImage from '../assets/homeMapMsa.png'
import careerPathwayPageImage from '../assets/homeNode.png'
import Layout from './layout'
import s from './style.module.css'

function Home() {
  return (
    <div className={s.homePage}>
      <Layout>
        <div className={s.imageContainer}>
          <div className={`${s.imageText}`}>
            <div className={`${s.mapImg}`}>
              <div>
                <h1 className={s.homeHeader1}>
                  Supercharge your career in
                  <br />
                  <b className={s.FnA}> finance and accounting </b>
                  <br />
                  with our interactive tools
                </h1>
                <Link href="/interactiveMap" legacyBehavior>
                  <a type="button" className={`${s.homeButton1Link} ${s.homeButton1}`}>
                    &gt; &nbsp; Explore Interactive Map
                  </a>
                </Link>
              </div>
              <div>
                <Image className={s.interactiveMapImage} src={interactiveMapImage} alt="mapImage"></Image>
              </div>
            </div>
          </div>
        </div>
        <div className={`${s.homePageSection2}`}>
          <div className={`${s.mapRedirect} col-10 col-sm-6`}>
            <h2 className="col-10 col-sm-10" style={{ color: '#1E4B76', textAlign: 'center' }}>
              <strong>Interactive map</strong>
            </h2>
            <p className="col-10 col-sm-10" style={{ textAlign: 'center' }}>
              Where are finance and accountant jobs in the highest demand? How do salaries compare in each area?
            </p>
            <Image
              className={`${s.interactiveMapPageImage} col-sm-10`}
              src={interactiveMapPageImage}
              style={{ height: '270px', maxWidth: '400px', borderRadius: '5px' }}
              alt="msaMapImage"
            ></Image>
            <Link href="/interactiveMap" legacyBehavior>
              <a href="/interactiveMap" type="button" className={`${s.exploreButton}`}>
                Explore
              </a>
            </Link>
          </div>
          <div className={`${s.nodeRedirect} col-10 col-sm-6`}>
            <h2 className="col-10 col-sm-10" style={{ color: '#1E4B76', textAlign: 'center' }}>
              <strong>Career pathway</strong>
            </h2>
            <p className="col-10 col-sm-10" style={{ textAlign: 'center' }}>
              Where do you want to go in your career? What skills do you need to get there?
            </p>
            <Image
              className={`${s.careerPathwayPageImage} col-sm-10`}
              src={careerPathwayPageImage}
              style={{ height: '270px', maxWidth: '400px', borderRadius: '5px' }}
              alt="NodeImage"
            ></Image>
            <Link href="/careerPathway" legacyBehavior>
              <a href="/careerPathway" type="button" className={`${s.exploreButton}`}>
                Explore
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Home
