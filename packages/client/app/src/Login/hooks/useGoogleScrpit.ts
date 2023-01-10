import * as React from 'react';

export const useGoogleScript = () => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const script = document.createElement('script');
    document.body.appendChild(script);

    script.src = import.meta.env.VITE_GAPI_URL;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      setIsError(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [setIsLoaded, setIsError]);

  return { isLoaded, isError };
};
