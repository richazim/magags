import { useEffect, useState } from 'react';

export function useAppwriteQuery<T>(queryFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async () => {
    setIsLoading(true);
    queryFn()
      .then((result) => {
        setData(result);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    execute();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: execute,
  };
}
