import React from "react"

class Slide extends React.Component{

    render(){
        return <div className="image-wrapper">
                <img src={this.props.src}></img>
                <img src={this.props.src2}></img>
                <img src={this.props.src3}></img>
            </div>
    }
}

export default Slide;