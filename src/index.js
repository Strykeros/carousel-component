
import ReactDOM from "react-dom"
import CoreApp from "./App.js"
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';

ReactDOM.render(<CoreApp /> , document.getElementById('app'))

function checkBrowserType(){
    if(navigator.userAgent.indexOf("Firefox")){

        let imgs = document.getElementsByClassName("image");
        let posLeft = 0; 

       for(let i = 0; i < imgs.length; i++){
            imgs[i].style.position = "absolute";
            imgs[i].style.left = `${posLeft}%`;
            posLeft += 33.33;
       }
    }
}

checkBrowserType();
