import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({ dark = true }) => (
    <img className="loader" src={dark ? '/loading.dark.png' : '/loading.png'} />
)

Loader.propTypes = {
    dark: PropTypes.bool
}

export default Loader
