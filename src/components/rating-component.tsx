import { FC } from "react";
import { Star } from "lucide-react";

interface Props {
  rating: number;
}

export const RatingComponent: FC<Props> = ({ rating }) => {
  const stars: boolean[] = [false, false, false, false].map(
    (_, idx) => idx < rating
  );

  return (
    <div className="flex justify-start items-center gap-x-0.5">
      <>
        <span>rating | </span>
        {stars.map((x, idx) => (
          <span key={`star-${idx}`}>
            {x === true ? (
              <Star
                key={`star-${idx}`}
                size="1rem"
                className="fill-current"
                stroke="0"
              />
            ) : (
              <Star size="1rem" strokeOpacity={0.3} strokeWidth="1" />
            )}
          </span>
        ))}
      </>
    </div>
  );
};
