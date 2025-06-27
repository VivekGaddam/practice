import { useState } from 'react'
import './App.css'
import Admin from './Admin'
import {Routes, Route} from 'react-router-dom'
import Organizations from './Organizations'
import Analytics from './Analytics'

function App() {
  return (
    <>
      <Routes>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin/organizations' element={<Organizations/>}/>
        <Route path="/admin/organizations/:name" element={<Analytics />} />
      </Routes>
    </>
  )
}

export default App
