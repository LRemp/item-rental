import { useCallback, useReducer, useRef } from 'react';
import useIsMounted from './useIsMounted';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'loading':
      return {
        loading: true,
      };
    case 'success':
      return {
        error: undefined,
        loading: false,
        result: action.payload,
      };
    case 'error':
      return {
        result: undefined,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const useAsync = (setResults = true, initialStateLoading = false) => {
  const DEFAULT_STATE = {
    loading: initialStateLoading,
  };
  const [{ loading, result, error }, dispatch] = useReducer(reducer, DEFAULT_STATE);
  const isMounted = useIsMounted();
  const promiseRef = useRef();

  const run = useCallback(
    async (promise: any) => {
      const isCurrentPromise = () => promiseRef.current === promise;
      promiseRef.current = promise;

      dispatch({ type: 'loading' });
      try {
        const data = await promise;
        if (isMounted() && isCurrentPromise()) {
          dispatch({ type: 'success', payload: setResults ? data : undefined });
        }
        return data;
      } catch (e: any) {
        if (isMounted() && isCurrentPromise() && e.name !== 'AbortError') {
          dispatch({ type: 'error', payload: setResults ? e : undefined });
        }
        //throw e;
      }
    },
    [isMounted, setResults]
  );

  return {
    result,
    error,
    loading,
    run,
  };
};

export default useAsync;
