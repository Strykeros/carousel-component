import React from "react";


const IMG_WIDTH = 100;
const IMG_HEIGHT = 100;


class Slide extends React.Component{

  
  constructor(props){
    super(props);
  }

  currentSlide = 0;
    lastTouch = 0;
    state = {
       currentIndex: 0,
       movement: 0,
    };


    importImages(imgs) {
      return imgs.keys().map(imgs);
    }

    handleMovementEnd = () => {
        const { movement, currentIndex } = this.state;
      
        const endPosition = movement / IMG_WIDTH;
        const endPartial = endPosition % 1;
        const endingIndex = endPosition - endPartial;
        const deltaInteger = endingIndex - currentIndex;
      
          let nextIndex = endingIndex;

        if (deltaInteger >= 0) {
            if (endPartial >= 0.1) {
              nextIndex += 1;
            }
        }
        else if (deltaInteger < 0) {
            nextIndex = currentIndex - Math.abs(deltaInteger);
            if (endPartial > 0.9) {
              nextIndex += 1;

            }
        }
        
        this.slideTo(nextIndex, Math.min(0.5, 1 - Math.abs(endPartial)));
          this.selectedRectangle();     
    };

    handleWheel = (e) => {
        clearTimeout(this.wheelTimeout);
        this.handleMovement(e.deltaX);
        this.wheelTimeout = setTimeout(() => this.handleMovementEnd(), 100);
    };

    handleTouchStart = (e) => {
        this.lastTouch = e.nativeEvent.touches[0].clientX;
    };

    handleTouchMove = e => {
        const delta = this.lastTouch - e.nativeEvent.touches[0].clientX;
        this.lastTouch = e.nativeEvent.touches[0].clientX;
        this.handleMovement(delta);
    };

    slideTo = (index, duration) => {
        this.setState({
          currentIndex: index,
          movement: index * IMG_WIDTH,
          transitionDuration: `${duration}s`,
        });
        this.currentSlide = index;
      
        this.transitionTimeout = setTimeout(() => {
          this.setState({ transitionDuration: "0s" });
        }, duration * 100);
    };
      
    componentWillUnmount = () => {
        clearTimeout(this.transitionTimeout);
    };
      

    handleTouchEnd = () => {
        this.handleMovementEnd();
        this.lastTouch = 0;
    };

    handleMovement = (delta) => {

        clearTimeout(this.transitionTimeout);

        this.setState((state) => {
          const maxLength = IMG_WIDTH * 3.09;
          let nextMovement = state.movement + delta / 6.5;      

          if (nextMovement < 0) {
            nextMovement = -7;
          }      

          if (nextMovement > maxLength) {
            nextMovement = maxLength; 
          }
 
          return {

            movement: nextMovement,
            transitionDuration: "0s",
          };
        });
    };

    selectedRectangle(){
      let rect = document.getElementsByClassName("rectangle");
      for(let i = 0; i < rect.length; i++){
        rect[i].classList.remove("active");
      }
      rect[this.currentSlide].className += " active";

    }

    rectangle(){
      const rectangles = [];
      for(let i = 0; i < 4; i++){
       
        rectangles.push(<div className={`rectangle ${i === 0 && 'active'}`}
          onClick={() => {
            this.slideTo(i, 0.5);
            this.setState({ selected: i });
            this.selectedRectangle();
        }}        
        style={{
          cursor: "pointer",
      }}
        ></div>)

      }

      return (
        <div className="rectangle-wrapper">
          {rectangles}
        </div>
      );
    }

    render() {

        const { movement, transitionDuration, currentIndex } = this.state;
        const images = this.importImages(require.context('../resources', false, /\.(png|jpe?g|svg)$/));        
        return (

            <div
              className="main"
              style={{
                width: `${IMG_WIDTH}%`,
                height: `${IMG_HEIGHT}vh`,
              }}
              onTouchStart={this.handleTouchStart}
              onTouchMove={this.handleTouchMove}
              onTouchEnd={this.handleTouchEnd}
              onWheel={this.handleWheel}
            >                  
            <h1>Image Gallery</h1>
                <div
                className="swiper"
                style={{
                    transform: `translateX(${movement * -1}%)`,
                    transitionDuration: transitionDuration,
                }}
                >

                {images.map((src) => {
                    return <img className="image" key={src} src={src} width="33.33%" height="70%"/>
                })}
                </div>
                {movement !== 0 && (
                    <button
                    className="back move"
                    style={{
                      padding: "0",
                    }}
                    onClick={() => {
                        this.slideTo(currentIndex - 1, 0.5);
                        this.selectedRectangle();
                    }}
                    >
                    ❮
                    </button>
                )}
               { this.currentSlide !== 3 && (
                    <button
                    className="next move"
                    style={{
                      padding: "0"
                    }}
                    onClick={() => {
                        this.slideTo(currentIndex + 1, 0.5);
                        this.selectedRectangle();
                    }}
                    >
                    ❯
                    </button>
                )}
              {this.rectangle()}      
            </div>  
        );
    }
}

export default Slide;