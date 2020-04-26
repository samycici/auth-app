import React from 'react'
import classnames from 'classnames'

const FlashMessages = ({ messages }) =>
    messages.map(message => (
        <div
            role="alert"
            key={message.id}
            className={classnames(
                'border-t border-b text-white font-bold text-center px-4 py-5',
                {
                    'bg-green border-green': !message.isError,
                    'bg-red-light border-red': message.isError
                }
            )}
        >
            <p className="text-lg">{message.message}</p>
        </div>
    ))

export default FlashMessages
