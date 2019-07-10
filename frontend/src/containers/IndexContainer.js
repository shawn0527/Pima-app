import React from 'react'
import Intro from '../components/index/Intro'
import About from '../components/index/About'
import MainFeatures from '../components/index/MainFeatureComponents'



const Index = () => {
    return(
        <React.Fragment>
            <Intro/>
            <MainFeatures />
            <About/>
        </React.Fragment>   
    )
}

export default Index