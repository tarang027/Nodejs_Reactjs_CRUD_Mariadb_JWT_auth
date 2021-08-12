import * as Actions from '../actions';

const initialState = {
    userInfo: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_USER_INFO:
            {
                return {
                    ...state,
                    userInfo: action.payload,
                }
            }
        case Actions.RESET_USER_INFO:
            {
                return {
                    ...state,
                    userInfo: null,
                }
            }
        default: return state;
    }
}

export default userReducer;