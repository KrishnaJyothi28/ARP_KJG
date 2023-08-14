import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import Image from 'next/image'
import { useRouter } from 'next/router'
import afpLogo from '../../assets/afp_logo_white.svg'
import lightCastLogo from '../../assets/lightcast_logo_white.png'
import logo from '../../assets/logo.svg'
import s from './style.module.css'

export default function Footer() {
  const router = useRouter()
  return (
    <div className={s.mainConatiner}>
      <div className={s.container}>
        <div className={s.FnALogo}>
          <Image src={logo} alt="FNA logo" onClick={() => router.push('/')} width={350} />
        </div>
        <div className={s.linkSection}>
          <ul>
            <li>
              <a href="mailto:financeandaccountantcareers@afponline.org">Contact us for more information</a>
            </li>
            <li>
              <a href="/">Terms and conditions</a>
            </li>
            <li>
              <a href="/">Privacy policy</a>
            </li>
          </ul>
          <div className={s.socialMedia}>
            <span>Follow us</span>
            <FacebookIcon className="text-4xl" />
            <TwitterIcon className="text-4xl" />
            <LinkedInIcon className="text-4xl" />
            <InstagramIcon className="text-4xl" />
          </div>
        </div>
      </div>
      <div className={s.logoContainer}>
        <div className={s.AFPLogo}>
          <span>Brought to you by : </span>
          <Image className="pt-4" src={afpLogo} alt="AFP Logo" width={200} style={{height:'auto', maxHeight:'80px'}} />
        </div>
        <div className={s.verticalLine}></div>
        <div className={s.lightCastLogo}>
          <span>Powered with data from: </span>
          <Image className="mt-4" src={lightCastLogo} alt="Lightcast Logo" width={300} />
        </div>
      </div>
    </div>
  )
}
