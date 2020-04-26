import { Helmet } from 'react-helmet'
import React, { Component, Fragment } from 'react'

// components
import Hero from '@components/Hero'

export class HomePage extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Fullstack-js Online</title>
                </Helmet>
                <Hero />
            </Fragment>
        )
    }
}

export default HomePage
