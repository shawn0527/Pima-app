import React from 'react'
import {connect} from 'react-redux'
import RealEstateCard from './RealEstateCard'

class RealEstateList extends React.Component {
    render() {
        const realEstates = this.props.realEstates.map(realEstate => <RealEstateCard key={realEstate.id} realEstate={realEstate}/>)
        return(
            <div>
                {realEstates}
            </div>
        )
    }
}

export default connect(state => state.realEstates)(RealEstateList)