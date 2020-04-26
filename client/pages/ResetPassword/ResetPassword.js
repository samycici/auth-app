import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { flashMessage } from 'redux-flash'
import React, { Component, Fragment } from 'react'
import ResetPasswordForm from '@components/ResetPasswordForm'
import { postResetPassword } from '@client/store/actions/auth'
import { ResetPasswordSchema } from '@client/validation-schemas'

export class ResetPasswordPage extends Component {
    /**
     * Initialize component state
     *
     * @var {Object}
     */
    state = {
        initialValues: {
            email: '',
            password: '',
            token: this.props.match.params.token
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
        }),
        match: PropTypes.shape({
            params: PropTypes.shape({
                token: PropTypes.string
            })
        })
    }

    /**
     * The validation schema for forgot password screen
     *
     * @var {Object}
     */
    ResetPasswordSchema = ResetPasswordSchema

    /**
     * Handle form submit
     *
     * @return null
     */
    onSubmit = (data, { setSubmitting, setErrors }) => {
        const { dispatch, history } = this.props

        dispatch(postResetPassword(data))
            .then(() => {
                history.push('/')

                dispatch(flashMessage('Password successfully reset.'))
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
                    <title>Reset Password</title>
                </Helmet>
                <ResetPasswordForm
                    {...this.props}
                    onSubmit={this.onSubmit}
                    initialValues={this.state.initialValues}
                    validationSchema={this.ResetPasswordSchema}
                />
            </Fragment>
        )
    }
}

export default connect()(ResetPasswordPage)
