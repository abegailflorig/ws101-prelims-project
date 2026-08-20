import { useCallback, useEffect, useState } from 'react';

export type FetchState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string };

interface UseFetchResult<T> {
  state: FetchState<T>;
  refetch: () => void;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [state, setState] = useState<FetchState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });
  const [requestKey, setRequestKey] = useState(0);

  const refetch = useCallback(() => {
    setRequestKey((key) => key + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const load = async (): Promise<void> => {
      setState({ status: 'loading', data: null, error: null });

      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as T;
        setState({ status: 'success', data, error: null });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        const message =
          error instanceof Error ? error.message : 'An unknown error occurred.';
        setState({ status: 'error', data: null, error: message });
      }
    };

    void load();

    return () => controller.abort();
  }, [url, requestKey]);

  return { state, refetch };
}