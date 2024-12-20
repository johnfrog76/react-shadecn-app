import React, {
  FC,
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import {
  getFeaturedRecipes,
  addRecipeToList,
  getRecipeCategoryName,
  editRecipe,
  deleteRecipe,
  bulkUpdateRecipes,
} from "@/providers/recipes/recipes.utils";
import { AuthContext } from "../auth/auth.provider";
import {
  RecipeService,
  IRecipeService,
} from "@/services/recipes/recipes.service";
import { iRecipeCategory } from "@/interfaces/category/category.interface";
import { iRecipe } from "@/interfaces/recipe/recipe.interface";

type RecipeContextType = {
  recipeItems: iRecipe[];
  recipeCount: number;
  bulkUpdateRecipes: (
    itemsToUpdate: iRecipe[],
    recipes: iRecipe[]
  ) => iRecipe[];
  getFeaturedRecipes: (recipes: iRecipe[]) => iRecipe[];
  addRecipeToList: (recipes: iRecipe[], recipe?: iRecipe) => iRecipe[];
  editRecipe: (recipes: iRecipe[], recipe?: iRecipe) => iRecipe[];
  deleteRecipe: (recipes: iRecipe[], recipe?: iRecipe) => iRecipe[];
  getRecipeCategoryName: (
    recipe: iRecipe,
    categoryItems: iRecipeCategory[]
  ) => string;
  setSpinner: (val: boolean) => void;
  makeFreshPull: (val: boolean) => void;
  setCount: (val: number) => void;
  setRecipeItems: (recipes: iRecipe[]) => void;
  isLoading: boolean;
  makeRequest: boolean;
};

export const RecipesContext = createContext<RecipeContextType>({
  recipeItems: [],
  recipeCount: 0,
  bulkUpdateRecipes: () => [],
  getFeaturedRecipes: () => [],
  addRecipeToList: () => [],
  editRecipe: () => [],
  deleteRecipe: () => [],
  getRecipeCategoryName: () => "",
  setSpinner: () => {},
  setCount: () => {},
  makeFreshPull: () => {},
  setRecipeItems: () => [],
  isLoading: true,
  makeRequest: true,
});

interface Props {
  children?: React.ReactNode;
}

const RecipesProvider: FC<Props> = ({ children }) => {
  const recipeService: IRecipeService = useMemo(() => {
    return new RecipeService();
  }, []);
  const [recipeItems, setRecipeItems] = useState<iRecipe[]>([]);
  const [recipeCount, setRecipeCount] = useState<number>(0);
  const [makeRequest, setMakeRequest] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const setSpinner = (val = true) => setIsLoading(val);
  const makeFreshPull = (val = true) => setMakeRequest(val);
  const setCount = (val = 0) => setRecipeCount(val);
  const { token, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (makeRequest) {
      setMakeRequest(false);

      if (isLoggedIn) {
        recipeService
          .getRecipesAuth(token)
          .then((resp) => {
            setTimeout(() => {
              setRecipeItems(resp);
              setCount(resp.length);
              setSpinner(false);
            }, 1500);
          })
          .catch((err) => {
            setSpinner(false);
            console.log(err);
          });
      } else {
        recipeService
          .getRecipes()
          .then((resp) => {
            setTimeout(() => {
              setSpinner(false);
              if (resp) {
                setRecipeItems(resp);
                setCount(resp.length);
              }
            }, 1500);
          })
          .catch((err) => {
            setSpinner(false);
            console.error(err);
          });
      }
    }
  }, [isLoggedIn, makeRequest, recipeService, token]);

  useEffect(() => {
    if (isLoggedIn) {
      setSpinner(true);
      makeFreshPull(true);
    } else {
      const tempRecipes = recipeItems.filter((r) => r.shared === true);
      setRecipeItems(tempRecipes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <RecipesContext.Provider
      value={{
        recipeItems,
        recipeCount,
        bulkUpdateRecipes,
        getFeaturedRecipes,
        addRecipeToList,
        setRecipeItems,
        editRecipe,
        deleteRecipe,
        getRecipeCategoryName,
        setSpinner,
        setCount,
        isLoading,
        makeRequest,
        makeFreshPull,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
