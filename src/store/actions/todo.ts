import { createRoutine } from 'redux-saga-routines';

import {
  TODO_GET_ALL,
  TODO_CREATE,
  TODO_UPDATE,
  TODO_DELETE,
  TODO_TOGGLE_STATUS,
  TODO_RESET_ERROR
} from '../constants/todo';

export const getAllTodos = createRoutine(TODO_GET_ALL);
export const createTodo = createRoutine(TODO_CREATE);
export const updateTodo = createRoutine(TODO_UPDATE);
export const deleteTodo = createRoutine(TODO_DELETE);
export const toggleTodoStatus = createRoutine(TODO_TOGGLE_STATUS);
export const resetTodoError = createRoutine(TODO_RESET_ERROR);
