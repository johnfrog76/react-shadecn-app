import { CardFavoriteComponent } from "@/components/favorites.component";
import { RatingComponent } from "@/components/rating-component";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthContext } from "@/providers/auth/auth.provider";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import { RecipesContext } from "@/providers/recipes/recipes.provider";

export const HomeComponent = () => {
  // const { isLoading, data } = useFetch("//localhost:3001/api/recipes/unauth/");
  const { recipeItems, isLoading } = useContext(RecipesContext);
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <>
      <h1 className="mt-4 mb-4 text-xl font-semibold">
        Home ({recipeItems?.length || 0})
      </h1>
      {isLoading && (
        <div className="text-primary flex justify-center w-full">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {recipeItems?.map((x, idx) => (
          <Card key={`item-${idx}`} className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex justify-between gap-6">
                <div className="flex-1">
                  <CardTitle>{x.r_name}</CardTitle>
                </div>
                {
                  <div className="flex-shrink-0 text-primary">
                    <CardFavoriteComponent
                      favorites={x.favorites}
                      isLoggedIn={isLoggedIn}
                      user={user}
                    />
                  </div>
                }
              </div>
            </CardHeader>
            <CardContent>
              <div className="line-clamp-2 text-sm">
                {x.steps && x.steps.join(". ")}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                {x.category}
                <RatingComponent rating={x.rating} />
              </div>
              <Button variant="link">View details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
