import './App.css'
import { Navbar } from './pages/Navbar'
import { Outlet } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import Footer from './components/Footer'


function App() {

  return (
    <>
      <ProductProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </ProductProvider>
    </>
  )
}

export default App
