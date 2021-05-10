import React from "react"
import Slide from "../components/slide.component.js"
import ele from "../components/constants.js"

const images = importImages(require.context('../resources', false, /\.(png|jpe?g|svg)$/));
let slideIndex = 1;


function CoreApp() {
    return (<div className="container-fluid main-parent">
        <div className ="row parent">  
            <div className="col-sm-12 col-lg-12 p-0 image-container">
                {AppContent()} 
                {addButtons()}                
            </div>
                         
        </div>

    </div>)
}

function AppContent(){
    const slides = [];
    let imageCount = 0;
    for(let i = 0; i < 2; i++){
        for(let i = 0; i < 2; i++){
            slides.push({src: images[imageCount++], src2: images[imageCount++], src3: images[imageCount++]}); 
        }
    }

    return (
        slides.map((elem) => (
          ele(Slide, elem)
        ))

    );
}

function activateSlide(){
    let imgWrapper = document.getElementsByClassName("image-wrapper");    
    return imgWrapper[0].classList.add("active"); 

}

function importImages(imgs) {
    return imgs.keys().map(imgs);
}

function addButtons(){
    let btnClassNames = ["btn-prev", "btn-next"];
    let btnInnerHTML = ["❮", "❯"];

    return [
        <button className={btnClassNames[0]} onClick={nextSlide.bind(null, -1, "leftBtn")}>{btnInnerHTML[0]}</button>,
        <button className={btnClassNames[1]} onClick={nextSlide.bind(null, 1, "rightBtn")}>{btnInnerHTML[1]}</button>
    ];
}

function prevSlide(){
    let imgWrapper = document.getElementsByClassName("image-wrapper");  

    if (slideIndex > imgWrapper.length) {
        slideIndex = 1;
    }
    if (slideIndex <= 1 && imgWrapper[0].classList.contains("active")) {
        slideIndex = 4;
    }

    for(let i = 0; i < imgWrapper.length; i++){
        
        imgWrapper[i].className = imgWrapper[i].className.replace(" active", ""); 
        imgWrapper[i].className = imgWrapper[i].className.replace(" slide-right", ""); 
        imgWrapper[i].className = imgWrapper[i].className.replace(" slide-left", "");
    }

    imgWrapper[slideIndex-1].className += " active";
    imgWrapper[slideIndex-1].className += " slide-right";
}

function nextSlide(int, caller){
    let imgWrapper = document.getElementsByClassName("image-wrapper");  
    slideIndex += int;

    if (slideIndex > imgWrapper.length) {
        slideIndex = 1;
    }
    if (slideIndex === 0) {
        slideIndex = 12;
    }

    if(caller === "leftBtn"){
        prevSlide();
        return;
    }

    for(let i = 0; i < imgWrapper.length; i++){
        imgWrapper[i].className = imgWrapper[i].className.replace(" active", ""); 
        imgWrapper[i].className = imgWrapper[i].className.replace(" slide-left", ""); 
        imgWrapper[i].className = imgWrapper[i].className.replace(" slide-right", ""); 
    }

    imgWrapper[slideIndex-1].className += " active";
    imgWrapper[slideIndex-1].className += " slide-left";

}

export { CoreApp, activateSlide}
