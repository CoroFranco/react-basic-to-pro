import { RandomFox } from "@/components/RandomFox";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [images, setImages] = useState<string[]>([]); 

  const imagen = useCallback(() => {
    const randomNumber = Math.ceil(Math.random() * 123);
    return `https://randomfox.ca/images/${randomNumber}.jpg`;
  }, []);

  useEffect(() => {
    const newImages = Array(4).fill(null).map(() => imagen()); 
    setImages(newImages);
  }, []); 

  return (
    <div>
      {
        images.map((image, index) => (
          <div className="w-60 h-60" key={index}>
            <RandomFox image={image} alt={image} />
          </div>
        ))
      }
    </div>
  );
}
