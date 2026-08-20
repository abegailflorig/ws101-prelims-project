import { useMemo, useReducer, useState } from 'react';
import Card from './components/Card';
import ItemList from './components/ItemList';
import SearchBar from './components/SearchBar';
import { useTheme } from './contexts/ThemeContext';
import { useFetch } from './hooks/useFetch';
import type { Todo } from './types/api';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

type Action =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_VISIBLE'; payload: number }
  | { type: 'RESET' };

interface AppState {
  query: string;
  visibleCount: number;
}

const initialState: AppState = {
  query: '',
  visibleCount: 8,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload, visibleCount: 8 };
    case 'SET_VISIBLE':
      return { ...state, visibleCount: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function App() {
  const { theme, toggleTheme } = useTheme();
  const { state: fetchState, refetch } = useFetch<Todo[]>(API_URL);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);

  const filteredTasks = useMemo(() => {
    if (fetchState.status !== 'success') return [];

    const query = state.query.toLowerCase();

    return fetchState.data.filter((task) =>
      task.title.toLowerCase().includes(query),
    );
  }, [fetchState, state.query]);

  const visibleTasks = filteredTasks.slice(0, state.visibleCount);
  const hasMore = state.visibleCount < filteredTasks.length;

  const handleSearch = (query: string) => {
    dispatch({ type: 'SET_QUERY', payload: query });
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">WS101 • PRELIM PROJECT</p>
          <h1>TaskFlow</h1>
        </div>

        <button className="theme-button" type="button" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark mode' : '☀️ Light mode'}
        </button>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <span className="pill">TypeScript + React SPA</span>
            <h2>Explore your tasks.</h2>
            <p>
              A responsive single-page application powered by a public REST API,
              typed components, a generic custom hook, Context, and useReducer.
            </p>
          </div>

          <Card title="API" badge="Live">
            <strong>JSONPlaceholder</strong>
            <p>100 sample tasks fetched from a public REST endpoint.</p>
          </Card>
        </section>

        <section className="toolbar">
          <SearchBar onSearch={handleSearch} />
          <button
            className="secondary-button"
            type="button"
            onClick={() => {
              dispatch({ type: 'RESET' });
              refetch();
            }}
          >
            Reset
          </button>
        </section>

        {fetchState.status === 'loading' && (
          <div className="message">
            <div className="spinner" />
            <p>Loading tasks from the API...</p>
          </div>
        )}

        {fetchState.status === 'error' && (
          <div className="message message--error">
            <h2>Something went wrong.</h2>
            <p>{fetchState.error}</p>
            <button type="button" onClick={refetch}>Try again</button>
          </div>
        )}

        {fetchState.status === 'success' && (
          <>
            <div className="section-heading">
              <div>
                <h2>Task collection</h2>
                <p>
                  Showing {visibleTasks.length} of {filteredTasks.length} matching tasks.
                </p>
              </div>
            </div>

            <ItemList items={visibleTasks} onSelect={setSelectedTask} />

            {hasMore && (
              <button
                className="load-more"
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'SET_VISIBLE',
                    payload: state.visibleCount + 8,
                  })
                }
              >
                Load more
              </button>
            )}
          </>
        )}
      </main>

      {selectedTask && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal__header">
              <span className="pill">Task #{selectedTask.id}</span>
              <button
                className="close-button"
                type="button"
                aria-label="Close details"
                onClick={() => setSelectedTask(null)}
              >
                ×
              </button>
            </div>
            <h2 id="task-title">{selectedTask.title}</h2>
            <p>
              User ID: <strong>{selectedTask.userId}</strong>
            </p>
            <p>
              Status:{' '}
              <strong>{selectedTask.completed ? 'Completed' : 'Pending'}</strong>
            </p>
            <button type="button" onClick={() => setSelectedTask(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      <footer>
        <p>WS101 Web Systems and Technologies 1 • Built with Vite, TypeScript and React</p>
      </footer>
    </div>
  );
}

export default App;