import { LazyImage } from "@/components/RandomFox";
import { useCallback, useEffect, useState } from "react";
const generateId = () => crypto.randomUUID()
interface ImageType  {id: string, url: string}

export default function Home() {
  const [images, setImages] = useState<ImageType[]>([]); 

  const imagen = useCallback((): ImageType => {
    const randomNumber = Math.ceil(Math.random() * 123);
    return {id: generateId(), url: `https://randomfox.ca/images/${randomNumber}.jpg`};
  }, []);

  const addNewFox: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setImages(prevImges => [...prevImges, imagen()])
  }

  const onLazyLoad = (ref: string): void => {
    console.log('ya cargo')
  }

  return (
    <div className="flex flex-col gap-10">
      <h1>Fox</h1>
      <button value='hola' onClick={addNewFox}>Button</button>
      {
        images.map(({id, url}) => (
          <div className="h-60 w-60" key={id}>
            <LazyImage onLazyLoad={() => onLazyLoad(url)} src={url} onClick={() => console.log('hola')} alt={url} />
          </div>
        ))
      }
    </div>
  );
}
