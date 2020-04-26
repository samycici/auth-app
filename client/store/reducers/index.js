import auth from './auth'
import { reducer as flash } from 'redux-flash'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth,
    flash
})

export default rootReducer
