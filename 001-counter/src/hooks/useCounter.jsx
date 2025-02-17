import { useRef, useState } from "react";

export function useCounter () {
  const [count, setCount] = useState(0)
  let intervalRef = useRef(null)

const startCounting = () => {
  if (!intervalRef.current) {
    intervalRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 100); 
  }
};

const stopCounting = () => {
  clearInterval(intervalRef.current);
  intervalRef.current = null;
};

const startDiscounting = () => {
  if(!intervalRef.current){
    intervalRef.current = setInterval(() => {
      setCount(prevCount => prevCount - 1)
    }, 100);
  }
}
const StopDiscounting = () => {
  clearInterval(intervalRef.current)
  intervalRef.current = null
}


const handleClick = () => {
  setCount(count + 1)
}

const restClick = () => {
  if (count === 0) return
  setCount(count - 1)
}

return {startCounting, stopCounting, startDiscounting,StopDiscounting, handleClick, restClick, count}
}
