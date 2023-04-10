import React from 'react'
import Carousel from 'react-elastic-carousel'
import EternalSunshine from "../images/EternalSunshine.jpg"
import Coraline from "../images/Coraline.jpg"
import LastNightInSoho from "../images/LastNightInSoho.jpg"
import TheNiceGuys from "../images/TheNiceGuys.jpg"
import GrandBudapest from "../images/GrandBudapest.jpg"
import "./components_style/Slideshow.css"


const breakPoints= [
    {width:1, itemsToShow:1},
];

export default function Slideshow() {
  return (
    <>
    <div className="Slideshow">
      <div className="Carousel">
        <Carousel breakPoints={breakPoints}>
        <img src={TheNiceGuys} style={{height:"600px"} } border-radius="100px" />
        <img src={Coraline} style={{height:"600px"}} />
        <img src={LastNightInSoho} style={{height:"600px"}} />
        <img src={EternalSunshine} style={{height:"600px"}} />
        <img src={GrandBudapest} style={{height:"600px"}} />
        </Carousel>
        </div>
    </div>
    </>
  )
}