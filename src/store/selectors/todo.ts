import { createSelector } from 'reselect';
import { RootState } from '../reducers';
import { TodoState } from '../actions/todo/types';

const getTodoState = (state: RootState): TodoState => state.todo;

export const getTodos = createSelector([getTodoState], (todoState: TodoState) => todoState.todos);

export const getIsLoading = createSelector(
  [getTodoState],
  (todoState: TodoState) => todoState.isLoading
);

export const getError = createSelector([getTodoState], (todoState: TodoState) => todoState.error);
