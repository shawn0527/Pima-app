import React from 'react'
import RealEstateList from '../components/realestates/RealEstateList'
import RealEstateLocation from '../components/realestates/RealEstatesLocation'
import RealEstateForm from '../components/realestates/RealEstateForm'
import {allRealEstates} from '../actions/realEstates'
import {connect} from 'react-redux'
import {Container} from 'semantic-ui-react'
import Loading from '../components/Loading'
const realEstatesUrl = 'http://localhost:3000/realestates'

class RealEstate extends React.Component {
    state={isLoading: true}
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
            this.setState({isLoading: false})
        })
    }

    render() {
        document.body.setAttribute('class', 'rental-page')
        return(this.state.isLoading?<Loading/>
        :<div>
            <Container>
                <RealEstateForm/>
                <RealEstateLocation/>
                <RealEstateList/>
            </Container> 
        </div>
        )
    }
}

export default connect(null, {allRealEstates})(RealEstate)