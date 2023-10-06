import { Amplify } from 'aws-amplify'
import awsmobile from '../aws-exports'
import '@/styles/globals.css'
import '@/styles/app.css'

Amplify.configure(awsmobile)

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
