import { iFavoriteItem } from "@/interfaces/recipe/recipe.interface";
import { iUser } from "@/providers/auth/auth.utilities";
import { Heart } from "lucide-react";
import { FC } from "react";

interface Props {
  favorites?: iFavoriteItem[];
  isLoggedIn: boolean;
  user: iUser | null;
}

export const CardFavoriteComponent: FC<Props> = ({
  favorites,
  isLoggedIn,
  user,
}) => {
  if (!isLoggedIn) {
    return "";
  }

  return favorites?.find((fav) => fav.userId === user?.userId) ? (
    <Heart size="24px" className="fill-current" stroke="0" />
  ) : (
    <Heart size="24px" />
  );
};
