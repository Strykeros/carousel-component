import React from "react"
import ReactDOM from "react-dom"
import {CoreApp} from "./App.js"
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {activateSlide} from "./App.js"

ReactDOM.render(<CoreApp />, document.getElementById('app'))
activateSlide();
