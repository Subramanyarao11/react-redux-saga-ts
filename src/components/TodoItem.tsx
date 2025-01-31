import { Todo } from '../types/todo';
import { useState } from 'react';
import { deleteTodo, toggleTodoStatus, updateTodo } from '../store/actions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createStructuredSelector } from 'reselect';
import { getIsLoading } from '../store/selectors/todo';

const stateSelector = createStructuredSelector({
  isLoading: getIsLoading
});

const TodoItem = ({ todo }: { todo: Todo }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(stateSelector);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleUpdate = () => {
    dispatch(
      updateTodo.trigger({
        id: todo._id,
        title: editTitle,
        description: editDescription
      })
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <div className="p-4 mb-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {!isEditing ? (
        <>
          <div className="flex items-center justify-between mb-2">
            <h3
              className={`text-lg font-semibold ${todo.isComplete ? 'line-through text-gray-500' : ''}`}
            >
              {todo.title}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(toggleTodoStatus.trigger({ id: todo._id }))}
                className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
              >
                {todo.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTodo.trigger(todo._id))}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
          <p className={`text-gray-600 ${todo.isComplete ? 'line-through' : ''}`}>
            {todo.description}
          </p>
        </>
      ) : (
        <div className="space-y-2">
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!editTitle.trim() || !editDescription.trim() || isLoading}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
