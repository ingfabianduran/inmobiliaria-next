import { createStore, combineReducers, applyMiddleware } from 'redux';
import usuariosReducer from './usuarios/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';


const reducers = combineReducers({
  usuariosReducer
});
const store = createStore(reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware)));

export { store };