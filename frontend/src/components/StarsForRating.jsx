export default function StarsForRating({ rating }) {
  const integerRating = Math.floor(rating);
  const decimalRating = parseFloat((rating % 1).toFixed(2));
  const numberOfStars = [];
  // console.log(integerRating);
  // console.log(decimalRating);

  let i = integerRating;
  while (i > 0) {
    numberOfStars.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#FFFF55"
      >
        <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
      </svg>
    );
    i--;
  }

  if (decimalRating > 0.25 && decimalRating < 0.75) {
    numberOfStars.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#FFFF55"
      >
        <path d="m606-286-33-144 111-96-146-13-58-136v312l126 77ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
      </svg>
    );
  }

  if (decimalRating >= 0.75) {
    numberOfStars.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#FFFF55"
      >
        <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
      </svg>
    );
  }

  return <>{numberOfStars}</>;
}
