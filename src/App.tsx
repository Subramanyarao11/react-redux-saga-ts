import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Todo App - React Redux Saga TS
        </h1>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
