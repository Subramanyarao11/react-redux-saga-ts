import { combineReducers } from 'redux';

// Import individual reducers here

const rootReducer = combineReducers({
  // Add reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
