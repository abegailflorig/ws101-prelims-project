# TaskFlow — WS101 Prelim Project

A single-page application built with **Vite + TypeScript + React** for the WS101 Web Systems and Technologies 1 Prelim Project.
The application retrieves Todo data from the **JSONPlaceholder REST API** and provides users with a simple, responsive interface for viewing, searching, filtering, and managing Todo information.

## Features

- TypeScript strict mode
- React functional components with typed props
- Generic `useFetch<T>()` custom hook
- REST API integration using JSONPlaceholder
- Loading, success, and error states
- `useReducer` for application state
- `useContext` for light/dark theme
- Search/filter functionality
- Load-more pagination
- Detail modal
- Responsive CSS

## API

This project uses the public JSONPlaceholder REST API:

https://jsonplaceholder.typicode.com/todos

## Requirements

- Node.js 18+ recommended
- npm

## Installation

```bash
npm install
```

## Run development server

```bash
npm run dev
```

## TypeScript check

```bash
npm run lint
```

This runs:

```bash
tsc --noEmit

