import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const SendEmailConfirm = ({ resendEmailConfirmation }) => (
    <div
        role="alert"
        className={classnames(
            'border-t border-b text-brown bg-gold-lightest font-bold text-center px-4 py-5'
        )}
    >
        <p className="text-lg">
            Please confirm your email address. Didn&rsquo;t receive an email ?
            <span
                onClick={resendEmailConfirmation}
                className="cursor-pointer underline text-brown ml-4"
            >
                Click here to resend email.
            </span>
        </p>
    </div>
)

SendEmailConfirm.propTypes = {
    resendEmailConfirmation: PropTypes.func.isRequired
}

export default SendEmailConfirm
