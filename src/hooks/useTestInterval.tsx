import { useState, useEffect } from 'react'

interface useTestIntervalProps {
  isGameStarted: boolean
  isGameEnded: boolean
}

export const useTestInterval = ({
  isGameStarted,
  isGameEnded,
}: useTestIntervalProps) => {
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isGameStarted && !isGameEnded) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    }

    if (!isGameStarted || isGameEnded) {
      if (interval) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isGameStarted, isGameEnded])

  return { timeElapsed, setTimeElapsed }
}
