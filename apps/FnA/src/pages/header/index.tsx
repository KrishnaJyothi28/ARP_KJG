import MenuIcon from '@mui/icons-material/Menu'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'
import { useEffect, useState } from 'react'
import logoSrc from '../../assets/logo.svg'
import s from './style.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const fullpath = router.pathname
    const element = document.getElementById(fullpath.replaceAll('/', ''))
    if (element) {
      element.style.color = '#FDC45D'
      element.style.fontWeight = 'bold'
    }
  }, [])
  return (
    <>
      <NextNProgress
        color="#FAA42A"
        height={10}
        transformCSS={(css) => {
          // Modify the css string or return your own CSS
          return (
            <style>
              {`
          ${css}
          #nprogress .spinner {
            display: none;
          }
        `}
            </style>
          )
        }}
      />
      <nav className={`navbar navbar-expand-md ${s.mainContainer}`}>
        <div className={`container-fluid`}>
          <div className={`${s.logo}`}>
            <Link href="/" legacyBehavior>
              <a id="toggler" className="navbar-brand">
                {' '}
                <Image className={s.img} src={logoSrc} alt="logo" />
              </a>
            </Link>
          </div>
          <a className={`navbar-toggler`} type="button" onClick={toggleMenu}>
            <MenuIcon className={s.menuIcon} />
          </a>
          <div
            style={{ justifyContent: 'flex-end' }}
            className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
            id="main_menu"
          >
            <ul className={`navbar-nav`} style={{ fontSize: '20px' }}>
              <li className={`nav-item`}>
                <Link href="/about" legacyBehavior>
                  <a id="about" style={{ color: 'white' }} className={`nav-link ${s.tabs}`}>
                    About
                  </a>
                </Link>
              </li>
              <li className={`nav-item`}>
                <Link href="/interactiveMap" legacyBehavior>
                  <a id="interactiveMap" style={{ color: 'white' }} className={`nav-link ${s.tabs}`}>
                    Interactive Map
                  </a>
                </Link>
              </li>
              <li className={`nav-item`}>
                <Link href="/careerPathway" legacyBehavior>
                  <a id="careerPathway" style={{ color: 'white' }} className={`nav-link ${s.tabs}`}>
                    Career Pathway
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
