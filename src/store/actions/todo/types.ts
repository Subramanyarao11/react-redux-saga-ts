export interface Todo {
  _id: string;
  title: string;
  description?: string;
  isComplete: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
}

export interface BaseResponse {
  statusCode: number;
  message: string;
  success: boolean;
}

export interface GetTodosResponse extends BaseResponse {
  data: Todo[];
}

export interface SingleTodoResponse extends BaseResponse {
  data: Todo;
}

export interface DeleteTodoResponse extends BaseResponse {
  data: {
    deletedTodo: Todo;
  };
}

export type TodoResponse = GetTodosResponse | SingleTodoResponse | DeleteTodoResponse;
