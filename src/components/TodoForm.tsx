import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from '../store/actions';
import { createStructuredSelector } from 'reselect';
import { getIsLoading } from '../store/selectors/todo';
import { useAppSelector } from '../store/hooks';

const stateSelector = createStructuredSelector({
  isLoading: getIsLoading
});

const TodoForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useAppSelector(stateSelector);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      dispatch(createTodo.trigger({ title, description }) as { type: string });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter title"
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Enter description"
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={!title.trim() || !description.trim() || isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
