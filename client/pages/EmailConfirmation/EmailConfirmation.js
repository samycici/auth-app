import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { flashMessage } from 'redux-flash'
import React, { Component, Fragment } from 'react'

// actions
import { postEmailConfirm } from '@client/store/actions/auth'

// components
import EmailConfirmationLoader from '@components/EmailConfirmationLoader'

export class EmailConfirmationPage extends Component {
    /**
     * The prop types for Email Confirmation Page
     *
     * @var {Object}
     */
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                token: PropTypes.string.isRequired
            })
        }),
        dispatch: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        })
    }
    /**
     * Trigger email confirmation action once page mounts
     *
     * @return {null}
     */
    componentDidMount() {
        const {
            match: {
                params: { token }
            },
            dispatch,
            history
        } = this.props

        dispatch(postEmailConfirm({ token }))
            .then(response => {
                localStorage.setItem(
                    'auth',
                    JSON.stringify(response.payload.data.data)
                )
                history.push('/')

                dispatch(flashMessage('Email confirmed.'))
            })
            .catch(() => {
                history.push('/')

                dispatch(
                    flashMessage('Error confirming email.', { isError: true })
                )
            })
    }

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Email confirmation</title>
                </Helmet>
                <EmailConfirmationLoader />
            </Fragment>
        )
    }
}

export default connect()(EmailConfirmationPage)
