import { configureStore } from '@reduxjs/toolkit';
import login from './reducers/loginReducer';


const store = configureStore({
    reducer: {
        login: login
    }
}
)

export default store;

/**
 * Il configureStore dev'essere wrappato nell'index .
 * E' un contenitore di reducer che verrano importati man mano con un "name":nomeReducer
 */