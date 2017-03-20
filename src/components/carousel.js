import React from 'react';
import Flickity from 'flickity';


 
var flickityOptions = {
    initialIndex: 0,
    cellSelector: '.sliderBoxes',
    accessibility: true,
    pageDots: true,
    wrapAround: true,
    autoPlay: 3000 // default false 
}
 
var Carousel = React.createClass({
    componentDidMount() {
    this.flkty = new Flickity(this.refs.carousel, {
      cellAlign: 'left',
    })
    },

    render () {
    return (
      <div ref="carousel" className="carousel"
        
      >
        <div className="sliderBoxes"></div>
        <div className="sliderBoxes"></div>
        <div className="sliderBoxes"></div>
      </div>
    );
  }
});
 
module.exports = Carousel;