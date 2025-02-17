import {useCounter} from '../hooks/useCounter'

export function Counter () {
  const {startCounting, stopCounting, startDiscounting,StopDiscounting, handleClick, restClick, count} = useCounter()
  return (
    <>
            <button onClick={restClick} onMouseDown={startDiscounting} onMouseUp={StopDiscounting}         onMouseLeave={StopDiscounting} 
        onTouchStart={startDiscounting} 
        onTouchEnd={StopDiscounting}> - </button>
      <p>{count}</p>
      <button onClick={handleClick} onMouseDown={startCounting} onMouseUp={stopCounting}         onMouseLeave={stopCounting} 
        onTouchStart={startCounting} 
        onTouchEnd={stopCounting}> + </button>
    </>
  )
}
