// Action types will be defined here
export const ACTION_TYPES = {
  // Example:
  // FETCH_DATA_REQUEST: 'FETCH_DATA_REQUEST',
  // FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
  // FETCH_DATA_FAILURE: 'FETCH_DATA_FAILURE',
} as const;

export type ActionTypes = typeof ACTION_TYPES;
