import type { AppProps } from 'next/app'
import { defaultCriteria } from 'src/contexts/criteria'
import CriteriaProvider from '../contexts/criteria/provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CriteriaProvider criteria={defaultCriteria}>
      <Component {...pageProps} />
    </CriteriaProvider>
  )
}

export default MyApp
