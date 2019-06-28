import React from 'react'

class Login extends React.Component {
    render(){
        return(
            <div>Hello from login
                <form>login form
                    <button onClick={() => this.props.history.push('/user')}>Login</button>
                    <button onClick={() => this.props.history.push('/register')}>Open an account</button>
                </form>
            </div>
        )
    }
}

export default Login