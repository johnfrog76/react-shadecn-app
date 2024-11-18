import { useState, useEffect } from "react";

export interface IRecipe {
  cat_id: string;
  r_name: string;
  category: string;
  comments: [];
  favorites: [];
  rating: number;
  steps: string[];
  ingredients: string[];
  user_id: string;
  _id: string;
  updatedAt: string;
}

export const useFetch = (url: string) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IRecipe[] | null>(null);

  useEffect(() => {
    setIsLoading(true);

    fetch(url)
      .then((resp) => resp.json())
      .then((jsonData) => {
        setTimeout(() => {
          setIsLoading(false);
          setData(jsonData as IRecipe[]);
        }, 3000);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [url]);

  return { isLoading, data, hasError };
};
