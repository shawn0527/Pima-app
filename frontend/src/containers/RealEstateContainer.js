import React from 'react'
import RealEstateList from '../components/realestates/RealEstateList'
import RealEstateCard from '../components/realestates/RealEstateCard'
import RealEstateLocation from '../components/realestates/RealEstatesLocation'
import RealEstateForm from '../components/realestates/RealEstateForm'
import {allRealEstates} from '../actions/realEstates'
import {connect} from 'react-redux'
const realEstatesUrl = 'http://localhost:3000/realestates'

class RealEstate extends React.Component {

    componentDidMount() {
        fetch(realEstatesUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorized': `Bear ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.props.allRealEstates(data, localStorage.user_id)
        })
    }

    render() {
        return(
            <div>
                <h1>RealEstate</h1>
                <RealEstateLocation/>
                <RealEstateList/>
                <RealEstateForm/>
            </div>
        )
    }
}

export default connect(null, {allRealEstates})(RealEstate)