import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'

// Components
import Logo from '@components/Logo'

const Topbar = ({ isAuthenticated, user, history, logout }) => {
    const logoutUser = () => {
        history.push('/')

        logout()
    }

    return (
        <Fragment>
            <div className="h-2 bg-gold" />

            <nav className="py-5 mx-10 flex justify-between items-center">
                <Logo />

                {!isAuthenticated && (
                    <div className="lg:inline-block">
                        <Link
                            to="/auth/login"
                            className="no-underline text-white mr-6 text-brown hover:text-brown-darkest trans-30"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/auth/register"
                            className="no-underline focus:outline-none text-white px-3 py-2 border-2 inline border-brown hover:border-brown-darkest rounded-full text-brown hover:text-brown-darkest trans-30"
                        >
                            Join Now
                        </Link>
                    </div>
                )}
                {isAuthenticated && (
                    <div className="flex items-center">
                        <span className="cursor-pointer hover:text-brown-darker text-brown">
                            Hey, <strong>{user.name}</strong>
                        </span>

                        <span
                            onClick={logoutUser}
                            className="ml-8 cursor-pointer hover:text-brown-darker text-brown"
                        >
                            Logout
                        </span>
                    </div>
                )}
            </nav>
        </Fragment>
    )
}

Topbar.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    user: PropTypes.shape({
        name: PropTypes.string
    }),
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

export default withRouter(Topbar)
