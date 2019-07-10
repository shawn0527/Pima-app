import React from 'react'
import RealEstateList from '../components/realestates/RealEstateList'
import RealEstateLocation from '../components/realestates/RealEstatesLocation'
import RealEstateForm from '../components/realestates/RealEstateForm'
import {allRealEstates} from '../actions/realEstates'
import {connect} from 'react-redux'
import Loading from '../components/Loading'
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
        <div class='rental-page'>
            <h1>RealEstate</h1>
            <RealEstateForm/>
            <RealEstateLocation/>
            <RealEstateList/> 
        </div>
        )
    }
}

export default connect(null, {allRealEstates})(RealEstate)