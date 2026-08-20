import { type ChangeEvent, type FormEvent, useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <label htmlFor="task-search">Search tasks</label>
      <div className="search__row">
        <input
          id="task-search"
          value={value}
          onChange={handleChange}
          placeholder="Try: learn, buy, meeting..."
          type="search"
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}