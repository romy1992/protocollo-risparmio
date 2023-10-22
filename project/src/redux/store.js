import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/loginReducer';
import containerReducer from './reducers/containerReducer';


const store = configureStore({
    reducer: {
        loginReducer,
        containerReducer,
    }
}
)

export default store;

/**
 * Il configureStore dev'essere wrappato nell'index .
 * E' un contenitore di reducer che verrano importati man mano con un "name":nomeReducer
 */