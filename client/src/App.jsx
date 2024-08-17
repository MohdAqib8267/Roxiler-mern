import './App.css'
import Banner from './Pages/Banner'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { BrowserRouter,Route, Routes } from 'react-router-dom'


function App() {


  return (
    <div className='w-full '>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Banner />} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
