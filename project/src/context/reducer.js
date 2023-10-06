import { SET_QUERY, SEARCH } from "./state"

const reducer = (state, action) => {
    const { type, payload } = action;

    if (type === SET_QUERY) {
        return {
            ...state, query: payload
        }
    }

    if (type === SEARCH) {
        if (payload !== "" && state.months.length !== 0)
            return {
                ...state,
                months: state.months
                    .filter((el) =>
                        el.name.toLowerCase().
                            includes(payload.toLowerCase()))
            }
        else if (payload !== "" && state.months.length === 0) {
            return {
                ...state,
                months: state.payload.months
                    .filter((el) =>
                        el.name.toLowerCase().
                            includes(payload.toLowerCase()))
            }
        }
        return {
            ...state,
            months: state.payload.months
        }


    }

    return state;
}

export default reducer;