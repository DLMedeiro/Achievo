// Custom Hook by Dan Abramov
// https://github.com/weibenfalk/react-snake-starter-files/blob/master/react-snake-finished/src/useInterval.js

import { useEffect, useRef } from 'react'

export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef<() => void>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.()
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
