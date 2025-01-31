import { Todo } from './todo';

export interface CreateTodoPayload {
  title: string;
  description: string;
}

export interface UpdateTodoPayload {
  id: string;
  title: string;
  description: string;
}

export interface ToggleTodoStatusPayload {
  id: string;
}

export interface TodoActionSuccess {
  data: {
    todo?: Todo | undefined;
    todos?: Todo[] | undefined;
  };
}

export interface TodoActionError {
  message: string;
}

export interface DeleteTodoSuccess {
  todoId: string;
}
