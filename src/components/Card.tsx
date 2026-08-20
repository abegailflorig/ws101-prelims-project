import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  badge?: string;
  onClick?: () => void;
}

export default function Card({ title, children, badge, onClick }: CardProps) {
  return (
    <article className={`card ${onClick ? 'card--clickable' : ''}`} onClick={onClick}>
      <div className="card__header">
        <h2>{title}</h2>
        {badge && <span className="badge">{badge}</span>}
      </div>
      <div className="card__body">{children}</div>
    </article>
  );
}