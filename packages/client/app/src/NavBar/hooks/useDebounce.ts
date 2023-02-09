import * as React from 'react';

export const useDebounce = (callback: () => void, interval: number = 1000) => {
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  return React.useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback();
    }, interval);
  }, [timer, interval]);
};
