import '@/styles/globals.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";   
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; 
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from 'next-themes'
import { Inter } from '@next/font/google'

const myInter = Inter({
  weight: ['100', '200','300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: "swap",
})

export default function App({ Component, pageProps }) {
  return <main className={myInter.className}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} /><ToastContainer autoClose={500} />
      </ThemeProvider>
    </main>
}





