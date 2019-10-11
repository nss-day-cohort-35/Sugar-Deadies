// Authors: Gradi, Mark, Quin, Sage
// Purpose of the File: Pushing all of the imported code from our various react files to the index.html div with the id of "root".

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
// import Nutshell from './components/Nutshell'
import Storage from './Storage'
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Router>
      <Storage />
  </Router>
  , document.getElementById('root'))
