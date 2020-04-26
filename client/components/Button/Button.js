import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

// components
import Loader from '@components/Loader'

const Button = ({ type = 'button', children, disabled, loading }) => (
    <button
        type={type}
        disabled={disabled || loading}
        className={classnames(
            'focus:outline-none rounded-sm hover:bg-emerald-light px-4 py-5 w-full text-white text-xl',
            {
                'bg-emerald': !disabled,
                'bg-emerald-light cursor-not-allowed': disabled
            }
        )}
    >
        {loading && <Loader dark={false} />}
        {!loading && children}
    </button>
)

Button.propTypes = {
    type: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.any.isRequired
}

export default Button
