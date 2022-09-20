import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import _ from "lodash"

export default {

    state: {
        isModalVisible: true,
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

    *setOpenModal(state){
        return {
            ...state,
            isModalVisible: true,
        }
    },
    *setClosedModal(state){
        return {
            ...state,
            isModalVisible: false,
        }
    }
};