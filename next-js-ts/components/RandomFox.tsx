import { useState, useEffect } from "react";

type Props = {
  image: string
  alt: string
}

export const RandomFox = ({image, alt}: Props): React.JSX.Element => {

  return (
    <main>
      <img src={image} alt={alt} />
    </main>
  );
};
