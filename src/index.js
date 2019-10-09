import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
// import Nutshell from './components/Nutshell'
import Dashboard from '../src/Dashboard'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Router>
      <Dashboard />
  </Router>
  , document.getElementById('root'))
