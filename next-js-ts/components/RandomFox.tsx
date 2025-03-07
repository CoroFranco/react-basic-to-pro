import { useState, useEffect, useRef } from "react";

type LazyImageProps = {
  image?: string
  alt?: string
  onLazyLoad?: () => void
}

type ImageTypes = React.ImgHTMLAttributes<HTMLImageElement>

type Props = LazyImageProps & ImageTypes

export const LazyImage = ({...imgProps}: Props): React.JSX.Element => {
  const [src, setSrc] = useState('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=')
  const node = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          setSrc(imgProps.src)
        }
      })
    })
    if(node.current) {
      observer.observe(node.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [imgProps.src])

  useEffect(() => {
    
  }, [])

  return (
    <main>
      <img {...imgProps} className="bg-amber-300 object-cover h-60 w-60" ref={node} src={src} />
    </main>
  );
};
