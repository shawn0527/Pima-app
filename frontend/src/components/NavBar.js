import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return(
        <div>
            hello form NavBar
            <NavLink to='/login'>Login</NavLink>
        </div>
    )
}

export default NavBar