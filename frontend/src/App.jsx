import Navbar from './components/Navbar'
import './App.css'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

function App() {


  return (
    <>
            <div>
              <Navbar/>
              <Outlet/>
              <Footer/>
            </div>
    </>
  )
}

export default App
