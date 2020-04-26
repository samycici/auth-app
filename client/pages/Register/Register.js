import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { flashMessage } from 'redux-flash'
import React, { Component, Fragment } from 'react'
import RegisterForm from '@components/RegisterForm'
import { postRegister } from '@client/store/actions/auth'
import { RegisterSchema } from '@client/validation-schemas'

export class RegisterPage extends Component {
    /**
     * Initialize component state
     *
     * @var {Object}
     */
    state = {
        initialValues: {
            name: '',
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
    RegisterSchema = RegisterSchema

    /**
     * Handle registration form submit
     *
     * @return null
     */
    onSubmit = (data, { setSubmitting, setErrors }) => {
        const { dispatch, history } = this.props

        dispatch(postRegister(data))
            .then(response => {
                localStorage.setItem(
                    'auth',
                    JSON.stringify(response.payload.data.data)
                )

                dispatch(flashMessage('Successfully registered.'))
                history.push('/')
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
                    <title>Register</title>
                </Helmet>
                <RegisterForm
                    {...this.props}
                    onSubmit={this.onSubmit}
                    validate={this.handleValidation}
                    validationSchema={this.RegisterSchema}
                    initialValues={this.state.initialValues}
                />
            </Fragment>
        )
    }
}

export default connect()(RegisterPage)
