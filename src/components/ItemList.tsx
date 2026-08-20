import Card from './Card';
import type { Todo } from '../types/api';

interface ItemListProps {
  items: Todo[];
  onSelect: (item: Todo) => void;
}

export default function ItemList({ items, onSelect }: ItemListProps) {
  if (items.length === 0) {
    return <div className="empty">No tasks matched your search.</div>;
  }

  return (
    <div className="grid">
      {items.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          badge={item.completed ? 'Completed' : 'Pending'}
          onClick={() => onSelect(item)}
        >
          <p>Task #{item.id}</p>
          <p className={item.completed ? 'status status--done' : 'status'}>
            {item.completed ? '✓ Finished' : '○ Still to do'}
          </p>
          <button
            className="text-button"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onSelect(item);
            }}
          >
            View details →
          </button>
        </Card>
      ))}
    </div>
  );
}