import { produce } from 'immer';
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
  resetTodoError
} from '../actions/todo';
import { TodoState } from '../../types/todo';
import { TodoActionSuccess, TodoActionError, DeleteTodoSuccess } from '../../types/payloadTypes';

type TodoAction = {
  type: string;
  payload?: TodoActionSuccess | TodoActionError | DeleteTodoSuccess;
};

export const initialState: TodoState = {
  todos: [],
  isLoading: false,
  error: null
};

export default (state = initialState, action: TodoAction) =>
  produce(state, (draft: TodoState) => {
    switch (action.type) {
      case getAllTodos.TRIGGER:
      case createTodo.TRIGGER:
      case updateTodo.TRIGGER:
      case deleteTodo.TRIGGER:
      case toggleTodoStatus.TRIGGER: {
        draft.isLoading = true;
        break;
      }

      case getAllTodos.SUCCESS: {
        draft.error = null; // Reset error on successful action to avoid showing stale error message
        if (action.payload && 'data' in action.payload && action.payload.data.todos) {
          draft.todos = action.payload.data.todos;
        }
        break;
      }

      case createTodo.SUCCESS: {
        draft.error = null;
        if (action.payload && 'data' in action.payload && action.payload.data.todo) {
          draft.todos.push(action.payload.data.todo);
        }
        break;
      }

      case updateTodo.SUCCESS:
      case toggleTodoStatus.SUCCESS: {
        draft.error = null;
        if (action.payload && 'data' in action.payload && action.payload.data.todo) {
          const updatedTodo = action.payload.data.todo;
          const index = draft.todos.findIndex(todo => todo._id === updatedTodo._id);
          if (index !== -1) {
            draft.todos[index] = action.payload.data.todo;
          }
        }
        break;
      }

      case deleteTodo.SUCCESS: {
        draft.error = null;
        if (action.payload && 'todoId' in action.payload) {
          const deletedTodoId = action.payload.todoId;
          const index = draft.todos.findIndex(todo => todo._id === deletedTodoId);
          if (index !== -1) {
            draft.todos.splice(index, 1);
          }
        }
        break;
      }

      case getAllTodos.FAILURE:
      case createTodo.FAILURE:
      case updateTodo.FAILURE:
      case deleteTodo.FAILURE:
      case toggleTodoStatus.FAILURE: {
        if (action.payload && 'message' in action.payload) {
          console.log('err reducer', action.payload.message);
          draft.error = action.payload.message;
        } else {
          draft.error = 'Something went wrong';
        }
        break;
      }

      case getAllTodos.FULFILL:
      case createTodo.FULFILL:
      case updateTodo.FULFILL:
      case deleteTodo.FULFILL:
      case toggleTodoStatus.FULFILL: {
        draft.isLoading = false;
        break;
      }

      case resetTodoError.TRIGGER: {
        draft.error = null;
        break;
      }

      default: {
        break;
      }
    }
  });
