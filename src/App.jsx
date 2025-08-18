import React from 'react'
import Spendly from './pages/Spendly'
import { Routes, Route } from 'react-router-dom'
import SpendlyOnboarding from './pages/SpendlyOnboarding'

const App = () => {
  return (
  <Routes>
  <Route path='/spendly' element={ <Spendly/>} />
  <Route path='/' element={<SpendlyOnboarding/>}/>
  </Routes>
   

  )
}

export default App