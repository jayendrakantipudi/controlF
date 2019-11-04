import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css"

class Home extends React.Component {
  
  responsive = {
    0: { items: 1 },
    1024: { items: 2 },
  }
 
  onSlideChange(e) {
    console.debug('Item`s position during a change: ', e.item)
    console.debug('Slide`s position during a change: ', e.slide)
  }
 
  onSlideChanged(e) {
    console.debug('Item`s position after changes: ', e.item)
    console.debug('Slide`s position after changes: ', e.slide)
  }
 
  render() {
    const imgmargin = {
    
    width:"760px",
    height:"500px",
    
    }
    return (
      <AliceCarousel
        
        autoPlayInterval={700}
        autoPlayDirection="ltr"
        autoPlay={true}
        fadeOutAnimation={true}
        mouseDragEnabled={false}
        
        disableAutoPlayOnAction={true}
      >

      <img src={require('../assets/image.jpeg')} className="yours-custom-class" style = {imgmargin} />
      <img src={require('../assets/image2.jpeg')}  className="yours-custom-class" style = {imgmargin} />
      <img src={require('../assets/image3.jpeg')}  className="yours-custom-class" style = {imgmargin} />
      <img src={require('../assets/image4.jpg')}  className="yours-custom-class" style = {imgmargin} />
      <img src={require('../assets/image5.jpg')}  className="yours-custom-class" style = {imgmargin} />
      </AliceCarousel>
    )
  }
}
export default Home;