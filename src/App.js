import React from "react"
import Slide from "../components/slide.component.js"
import ele from "../components/constants.js"

const images = importImages(require.context('../resources', false, /\.(png|jpe?g|svg)$/));
let index = 1;

function CoreApp() {
    return (<div className="container-fluid main-parent">
        <div className ="row parent">  
            <div className="col-sm-12 col-lg-8 image-container">
                {AppContent()} 
            </div>
            {addButtons()}             
        </div>

    </div>)
}
    const slides = [];
function AppContent(){

    for(let i = 0; i < 12; i++){
        slides.push({src: images[i]});        
    }

    return (
        slides.map((elem) => (
          ele(Slide, elem)
        ))
    );
}

function importImages(imgs) {
    return imgs.keys().map(imgs);
}

function addButtons(){
    let btnClassNames = ["btn-prev col-lg-2", "btn-next col-lg-2"];
    let btnInnerHTML = ["❮", "❯"];

    //imgWrapper.classList.add("active");
    const buttons = [];
    for(let i = 0; i < 2; i++){
        buttons.push(<button className={btnClassNames[i]} onClick={nextSlide()}>{btnInnerHTML[i]}</button>);
    }
    return buttons;
}

function nextSlide(){
    let imgWrapper = document.getElementsByName("image-wrapper");  
    console.log(imgWrapper) 
    //imgWrapper[index].className += " active";
}

export default CoreApp
