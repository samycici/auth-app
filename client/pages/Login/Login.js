import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { flashMessage } from 'redux-flash'
import LoginForm from '@components/LoginForm'
import React, { Component, Fragment } from 'react'
import { postLogin } from '@client/store/actions/auth'
import { LoginSchema } from '@client/validation-schemas'

class LoginPage extends Component {
    /**
     * Initialize component state
     *
     * @var {Object}
     */
    state = {
        initialValues: {
            email: '',
            password: ''
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
     * The validation schema for login screen
     *
     * @var {Object}
     */
    LoginSchema = LoginSchema

    /**
     * Handle form submit
     *
     * @return null
     */
    onSubmit = (data, { resetForm, setSubmitting, setErrors }) => {
        const { dispatch, history } = this.props

        dispatch(postLogin(data))
            .then(response => {
                localStorage.setItem(
                    'auth',
                    JSON.stringify(response.payload.data.data)
                )

                history.push('/')
                dispatch(flashMessage('Successfully logged in.'))
            })
            .catch(({ error }) => {
                setSubmitting(false)
                setErrors({ email: error.response.data.message })
            })
    }

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <LoginForm
                    {...this.props}
                    onSubmit={this.onSubmit}
                    validate={this.handleValidation}
                    validationSchema={this.LoginSchema}
                    initialValues={this.state.initialValues}
                />
            </Fragment>
        )
    }
}

export default connect()(LoginPage)
