import React from "react"
import Slide from "../components/slide.component.js"
import ele from "../components/constants.js"

const images = importImages(require.context('../resources', false, /\.(png|jpe?g|svg)$/));

function CoreApp() {
    return (<div className="main-parent">
        <div className ="parent">  
            <div className= "image-container">
                {AppContent()}              
            </div>
                         
        </div>

    </div>)
}

function AppContent(){
    return <Slide />;
}

function importImages(imgs) {
    return imgs.keys().map(imgs);
}


export { CoreApp}
