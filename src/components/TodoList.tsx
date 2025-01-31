import { useEffect } from 'react';
import TodoItem from './TodoItem';
import Spinner from './Spinner';
import { createStructuredSelector } from 'reselect';
import { getError, getIsLoading, getTodos } from '../store/selectors/todo';
import { getAllTodos, resetTodoError } from '../store/actions';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const stateSelector = createStructuredSelector({
  todos: getTodos,
  isLoading: getIsLoading,
  error: getError
});

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { todos, isLoading, error } = useAppSelector(stateSelector);

  useEffect(() => {
    dispatch(getAllTodos.trigger());
  }, [dispatch]);

  const handleErrorClose = () => {
    dispatch(resetTodoError.trigger());
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button onClick={handleErrorClose} className="text-red-700 hover:text-red-900">
            ×
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <div className="space-y-4">
          {todos.map(todo => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
