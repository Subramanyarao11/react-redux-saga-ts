import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllTodos, createTodo, updateTodo, deleteTodo, toggleTodoStatus } from '../actions/todo';
import { DeleteTodoResponse, GetTodosResponse, SingleTodoResponse } from '../../types/todo';
import {
  CreateTodoPayload,
  UpdateTodoPayload,
  ToggleTodoStatusPayload,
  TodoActionError
} from '../../types/payloadTypes';
import { api } from '../../services/api';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '../../services/api';

function* getAllTodosRequest() {
  try {
    yield put(getAllTodos.request());
    const response: GetTodosResponse = yield call(api, 'GET');
    if (response.success) {
      yield put(getAllTodos.success({ data: { todos: response.data } }));
    } else {
      yield put(getAllTodos.failure({ message: response.message }));
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorPayload: TodoActionError = {
      message: axiosError.response?.data?.message || 'Failed to fetch todos'
    };
    yield put(getAllTodos.failure(errorPayload));
  } finally {
    yield put(getAllTodos.fulfill());
  }
}

function* createTodoRequest(action: { type: string; payload: CreateTodoPayload }) {
  try {
    yield put(createTodo.request());
    const response: SingleTodoResponse = yield call(api, 'POST', '', action.payload);
    if (response.success) {
      yield put(createTodo.success({ data: { todo: response.data } }));
    } else {
      yield put(createTodo.failure({ message: response.message }));
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorPayload: TodoActionError = {
      message: axiosError.response?.data?.message || 'Failed to create todo'
    };
    yield put(createTodo.failure(errorPayload));
  } finally {
    yield put(createTodo.fulfill());
  }
}

function* updateTodoRequest(action: { type: string; payload: UpdateTodoPayload }) {
  try {
    yield put(updateTodo.request());
    const { id, ...data } = action.payload;
    const response: SingleTodoResponse = yield call(api, 'PATCH', `/${id}`, data);
    if (response.success) {
      yield put(updateTodo.success({ data: { todo: response.data } }));
    } else {
      yield put(updateTodo.failure({ message: response.message }));
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorPayload: TodoActionError = {
      message: axiosError.response?.data?.message || 'Failed to update todo'
    };
    yield put(updateTodo.failure(errorPayload));
  } finally {
    yield put(updateTodo.fulfill());
  }
}

function* deleteTodoRequest(action: { type: string; payload: string }) {
  try {
    yield put(deleteTodo.request());
    const response: DeleteTodoResponse = yield call(api, 'DELETE', `/${action.payload}`);
    if (response.success) {
      yield put(deleteTodo.success({ todoId: action.payload }));
    } else {
      yield put(deleteTodo.failure({ message: response.message }));
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorPayload: TodoActionError = {
      message: axiosError.response?.data?.message || 'Failed to delete todo'
    };
    yield put(deleteTodo.failure(errorPayload));
  } finally {
    yield put(deleteTodo.fulfill());
  }
}

function* toggleTodoStatusRequest(action: { type: string; payload: ToggleTodoStatusPayload }) {
  try {
    yield put(toggleTodoStatus.request());
    const { id } = action.payload;
    const response: SingleTodoResponse = yield call(api, 'PATCH', `/toggle/status/${id}`);
    if (response.success) {
      yield put(toggleTodoStatus.success({ data: { todo: response.data } }));
    } else {
      yield put(toggleTodoStatus.failure({ message: response.message }));
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorPayload: TodoActionError = {
      message: axiosError.response?.data?.message || 'Failed to toggle todo status'
    };
    yield put(toggleTodoStatus.failure(errorPayload));
  } finally {
    yield put(toggleTodoStatus.fulfill());
  }
}

export default function* todoSaga() {
  yield takeLatest(getAllTodos.TRIGGER, getAllTodosRequest);
  yield takeLatest(createTodo.TRIGGER, createTodoRequest);
  yield takeLatest(updateTodo.TRIGGER, updateTodoRequest);
  yield takeLatest(deleteTodo.TRIGGER, deleteTodoRequest);
  yield takeLatest(toggleTodoStatus.TRIGGER, toggleTodoStatusRequest);
}
