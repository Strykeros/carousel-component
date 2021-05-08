import React from "react"

class Slide extends React.Component{

    render(){
        return <div className="image-wrapper"><img src={this.props.src}></img></div>
    }
}

export default Slide;