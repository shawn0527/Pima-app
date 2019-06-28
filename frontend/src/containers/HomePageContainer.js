import React from 'react'
import {NavLink} from 'react-router-dom'

class HomePage extends React.Component {
    render() {
        return(
            <div>
                HomePage
                <p>table</p>
                <p>chart</p>
                <p>total amount</p>
                <p>CPI</p>
                <NavLink to='/user/stocks'>Stock</NavLink><br></br>
                <NavLink to='/user/realestates'>RealEstate</NavLink><br></br>
                <NavLink to='/user/investments'>Investment</NavLink>
            </div>
        )
    }
}

export default HomePage