import React, { ReactNode } from 'react'
import Footer from './footer'
import Header from './header'

interface LayoutProps {
  children: ReactNode
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <Header></Header>
      </header>

      <main>{children}</main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
}

export default Layout
