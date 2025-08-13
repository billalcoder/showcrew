import viteLogo from '/animation.mp4'
import './App.css'
import { Navbar } from './pages/Navbar'
import { Outlet } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import { Hero } from './pages/Hero'
import Branding from './components/Branding'
import {ProductSection} from './components/MenWatchSection'


function App() {

  return (
    <>
      <ProductProvider>
        <Navbar />
        <Hero />
        <Branding />
        <ProductSection
          title="MEN'S WATCH"
          description="Upto 50% Off On Groceries | QUALITY | FREASH PRODUCT"
          category="Groceries"
        />
        <ProductSection
          title="MEN'S WATCH"
          description="Upto 50% Off On Fragrances | BEST QUALITY | GOOD"
          category="beauty"
        />
      </ProductProvider>

      {/* <video src={viteLogo} autoPlay controls></video> */}
    </>
  )
}

export default App
