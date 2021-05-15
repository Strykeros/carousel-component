import React from "react"
import Slide from "../components/slide.component.js"

function CoreApp() {
    return ( 
            <div className= "gallery-container">
                {AppContent()}              
            </div>
    )
}

function AppContent(){
    return <Slide />;
}

export default CoreApp
