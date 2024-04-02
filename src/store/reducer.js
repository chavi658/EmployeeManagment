import * as actionsName from './action';

const initialState = {
    employee: null,
    employees: [],
    roules:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsName.SET_EMPLOYEE:
            return {
                ...state,
                employee: action.employee
            }
        case actionsName.ADD_EMPLOYEE:
            return {
                ...state,
                employees: [...state.employees, action.data]
            }
        case actionsName.SET_EMPLOYEES:
            return {
                ...state,
                employees: action.data
            }
        case actionsName.SET_ROULES:
            return {
                ...state,
                roules: action.data
            }
        default:
            return state;
    }
}

export default reducer;
