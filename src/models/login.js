import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import _ from "lodash"

export default {

    state: {
        authorization: "",
    },

    // Effect:
    
    *checkUserAuthorization( { payload }, { put, call } ){
        let response = yield call(login.checkLoggedInUser, payload)

        yield put({
            type: "setLoginAuthorization",
            payload: {
                authorization: response,
            },
        });
    },

    // Reducer:

    *setLoginAuthorization( { state, action } ){
        return {
            ...state,
            authorization: action.payload,
        }
    }
};