import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from '@client/store'
import Main from '@client/pages/Main'

/**
 * Get the container for the react application
 */
const app = document.getElementById('app')

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Main />
        </Provider>,
        app
    )
}

if (app) render()

if (module.hot) module.hot.accept()
