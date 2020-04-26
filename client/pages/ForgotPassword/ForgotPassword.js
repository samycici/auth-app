import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { flashMessage } from 'redux-flash'
import React, { Component, Fragment } from 'react'
import { postForgotPassword } from '@client/store/actions/auth'
import ForgotPasswordForm from '@components/ForgotPasswordForm'
import { ForgotPasswordSchema } from '@client/validation-schemas'

export class ForgotPasswordPage extends Component {
    /**
     * Initialize component state
     *
     * @var {Object}
     */
    state = {
        initialValues: {
            email: ''
        }
    }

    /**
     * Define component proptypes
     *
     * @var {Object}
     */
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        })
    }

    /**
     * The validation schema for forgot password screen
     *
     * @var {Object}
     */
    ForgotPasswordSchema = ForgotPasswordSchema

    /**
     * Handle form submit
     *
     * @return null
     */
    onSubmit = (data, { setSubmitting, setErrors }) => {
        const { dispatch, history } = this.props

        dispatch(postForgotPassword(data))
            .then(() => {
                history.push('/')

                dispatch(flashMessage('Password reset link sent.'))
            })
            .catch(({ error }) => {
                setSubmitting(false)
                setErrors(error.response.data.data.errors)
            })
    }

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Forgot Password</title>
                </Helmet>
                <ForgotPasswordForm
                    {...this.props}
                    onSubmit={this.onSubmit}
                    initialValues={this.state.initialValues}
                    validationSchema={this.ForgotPasswordSchema}
                />
            </Fragment>
        )
    }
}

export default connect()(ForgotPasswordPage)
