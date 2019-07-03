import React from 'react'
import RealEstateList from '../components/realestates/RealEstateList'
import RealEstateCard from '../components/realestates/RealEstateCard'
import RealEstateLocation from '../components/realestates/RealEstatesLocation'
import RealEstateForm from '../components/realestates/RealEstateForm'

class RealEstate extends React.Component {
    render() {
        return(
            <div>
                <h1>RealEstate</h1>
                <RealEstateList/>
                <RealEstateLocation/>
                <RealEstateCard/>
                <RealEstateForm/>
            </div>
        )
    }
}

export default RealEstate