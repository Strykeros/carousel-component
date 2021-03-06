import React from "react";


const IMG_WIDTH = 100;
const IMG_HEIGHT = 100;

class Slide extends React.Component{

    lastTouch = 0;
    state = {
       imgs: ["resources/img1.jpg", "resources/img2.jpg", "resources/img3.jpg", "resources/img4.jpg", "resources/img5.jpg",
       "resources/img6.jpg", "resources/img7.jpg", "resources/img8.jpg", "resources/img9.jpg", "resources/img10.jpg", "resources/img11.jpg",
       "resources/img12.jpg"],
       currentIndex: 0,
       movement: 0,
    };

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
          const maxLength = state.imgs.length - 1;
      
          let nextMovement = state.movement + delta;
      
          if (nextMovement < 0) {
            nextMovement = 0;
          }
      
          if (nextMovement > maxLength * IMG_WIDTH) {
            nextMovement = maxLength * IMG_WIDTH;
          }
      
          return {
            movement: nextMovement,
            transitionDuration: "0s",
          };
        });
    };

    rectangle(){
      const rectangles = [];
      for(let i = 0; i < 4; i++){
        rectangles.push(<div className="rectangle"
          onClick={() => {
            this.slideTo(i, 0.5);
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
        const { movement, transitionDuration, imgs, currentIndex } = this.state;
        const maxLength = imgs.length - 1;
        const maxMovement = maxLength * IMG_WIDTH;
        
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

                {imgs.map((src) => {
                    return <img key={src} src={src} width="33.33%" height="70%"/>
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
                    }}
                    >
                    ???
                    </button>
                )}
               { movement !== maxMovement && (
                    <button
                    className="next move"
                    style={{
                      padding: "0"
                    }}
                    onClick={() => {
                        this.slideTo(currentIndex + 1, 0.5);
                        console.log(maxMovement);
                    }}
                    >
                    ???
                    </button>

                )}
              {this.rectangle()}
            </div>
            
        );
    }
}

export default Slide;