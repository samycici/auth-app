export const SET_AUTH = 'SET_AUTH'
export const POST_LOGIN = 'POST_LOGIN'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const POST_REGISTER = 'POST_REGISTER'
export const POST_EMAIL_CONFIRM = 'POST_EMAIL_CONFIRM'
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'
export const POST_RESET_PASSWORD = 'POST_RESET_PASSWORD'
export const POST_FORGOT_PASSWORD = 'POST_FORGOT_PASSWORD'
export const POST_REGISTER_SUCCESS = 'POST_REGISTER_SUCCESS'
export const POST_RESEND_EMAIL_CONFIRM = 'POST_RESEND_EMAIL_CONFIRM'
export const POST_EMAIL_CONFIRM_SUCCESS = 'POST_EMAIL_CONFIRM_SUCCESS'

/**
 * Make post request to server to register a user
 *
 * @param {Object} data the user registration data from form
 * @return {Object} redux action
 */
export const postRegister = data => ({
    type: POST_REGISTER,
    payload: {
        request: {
            method: 'POST',
            url: 'auth/register',
            data
        }
    }
})

/**
 * Create action to login a user
 *
 * @param {Object} data login credentials
 * @return {Object} Redux action
 */
export const postLogin = data => ({
    type: POST_LOGIN,
    payload: {
        request: {
            method: 'POST',
            url: 'auth/login',
            data
        }
    }
})

/**
 * Make post request to request a password reset
 *
 * @param {Object} data
 * @return {Object} redux action object
 */
export const postForgotPassword = data => ({
    type: POST_FORGOT_PASSWORD,
    payload: {
        request: {
            method: 'POST',
            url: 'auth/passwords/email',
            data
        }
    }
})

/**
 * Make post request to reset user password
 *
 * @param {Object} data
 * @return {Object} redux action object
 */
export const postResetPassword = data => ({
    type: POST_RESET_PASSWORD,
    payload: {
        request: {
            method: 'POST',
            url: 'auth/passwords/reset',
            data
        }
    }
})

/**
 * Confirm user email address
 *
 * @param {Object} data
 * @return {Object} redux action object
 */
export const postEmailConfirm = data => ({
    type: POST_EMAIL_CONFIRM,
    payload: {
        request: {
            method: 'POST',
            url: 'auth/emails/confirm',
            data
        }
    }
})

/**
 * Resend email confirmation email to user.
 *
 * @param {Object} data
 * @return {Object} redux action object
 */
export const postResendEmailConfirm = () => ({
    type: POST_RESEND_EMAIL_CONFIRM,
    payload: {
        request: {
            method: 'POST',
            url: 'auth/emails/confirm/resend'
        }
    }
})

/**
 * Set the auth data for a user
 *
 * @param {Object} data the user data from server
 * @return {Object} action sent to redux store
 */
export const authLogout = data => ({
    type: AUTH_LOGOUT,
    payload: data
})
