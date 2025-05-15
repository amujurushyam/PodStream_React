import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MianLayout from './layout/MainLayout'
import Home from './pages/Home'
import './index.css'

const App = () => {
  return (
    <div className="">
      <Router>
        <Routes >
          <Route path="/" element={<MianLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
