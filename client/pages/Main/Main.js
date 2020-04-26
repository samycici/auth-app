import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loadable from 'react-loadable'
import React, { Component } from 'react'
import { flashMessage } from 'redux-flash'
import { BrowserRouter, Route } from 'react-router-dom'

// components
import Flash from '@components/Flash'
import Topbar from '@components/Topbar'
import PageLoader from '@components/PageLoader'
import SendEmailConfirm from '@components/SendEmailConfirm'

// css
import '@client/styles/main.css'

// actions
import { authLogout, postResendEmailConfirm } from '@client/store/actions/auth'

const HomePage = Loadable({
    loader: () => import('@pages/Home'),
    loading: PageLoader
})

const LoginPage = Loadable({
    loader: () => import('@pages/Login'),
    loading: PageLoader
})

const RegisterPage = Loadable({
    loader: () => import('@pages/Register'),
    loading: PageLoader
})

const ResetPasswordPage = Loadable({
    loader: () => import('@pages/ResetPassword'),
    loading: PageLoader
})

const ForgotPasswordPage = Loadable({
    loader: () => import('@pages/ForgotPassword'),
    loading: PageLoader
})

const EmailConfirmationPage = Loadable({
    loader: () => import('@pages/EmailConfirmation'),
    loading: PageLoader
})

export class Main extends Component {
    /**
     * Define prop types for this component
     *
     *@var {Object}
     */
    static propTypes = {
        flash: PropTypes.shape({
            messages: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string,
                    message: PropTypes.string,
                    isError: PropTypes.bool
                })
            )
        }),
        user: PropTypes.shape({}),
        dispatch: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired
    }

    /**
     * Logout a user
     *
     * @return {null}
     */
    logout = () => {
        const { dispatch } = this.props
        localStorage.removeItem('auth')

        dispatch(authLogout())
        dispatch(flashMessage('Successfully logged out.'))
    }

    /**
     * Resend email confirmation to user
     *
     * @return {null}
     */
    resendEmailConfirmation = () => {
        const {
            dispatch,
            user: { email }
        } = this.props

        dispatch(postResendEmailConfirm({ email }))
            .then(() => {
                dispatch(flashMessage('Confirm email resent.'))
            })
            .catch(() => {
                dispatch(
                    flashMessage('Error sending password reset link.', {
                        isError: true
                    })
                )
            })
    }

    /**
     * Render the Main component
     *
     * @return {JSX}
     */
    render() {
        const { flash, isAuthenticated, user } = this.props

        return (
            <BrowserRouter>
                <div className="page pb-16">
                    <Flash messages={flash.messages} />
                    {user && !user.emailConfirmedAt && (
                        <SendEmailConfirm
                            resendEmailConfirmation={
                                this.resendEmailConfirmation
                            }
                        />
                    )}
                    <Topbar
                        user={user}
                        logout={this.logout}
                        isAuthenticated={isAuthenticated}
                    />
                    <Route path={'/'} component={HomePage} />
                    <Route path={'/auth/login'} component={LoginPage} />
                    <Route path={'/auth/register'} component={RegisterPage} />
                    <Route
                        path={'/auth/passwords/reset/:token'}
                        component={ResetPasswordPage}
                    />
                    <Route
                        path={'/auth/passwords/email'}
                        component={ForgotPasswordPage}
                    />
                    <Route
                        path={'/auth/emails/confirm/:token'}
                        component={EmailConfirmationPage}
                    />
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(state => ({
    user: state.auth.user,
    flash: state.flash,
    isAuthenticated: !!state.auth.user
}))(Main)
