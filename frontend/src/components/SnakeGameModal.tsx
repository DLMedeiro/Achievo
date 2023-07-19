import React, { useState, useRef, useEffect } from 'react'
import { useInterval } from './Snake/useInterval'
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
} from './Snake/constants'
import { Button } from '@mui/material'

function SnakeGameModal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState<number[][]>(SNAKE_START)
  const [apple, setApple] = useState<number[]>(APPLE_START)
  const [dir, setDir] = useState<[number, number]>([0, -1])
  const [speed, setSpeed] = useState<number | null>(null)
  const [gameOver, setGameOver] = useState<boolean>(false)

  useInterval(() => gameLoop(), speed)

  const endGame = () => {
    setSpeed(null)
    setGameOver(true)
  }

  const moveSnake = (event: React.KeyboardEvent) => {
    const key = event.key
    if (key === 'ArrowUp' && dir[0] !== 0 && dir[1] !== 1) {
      setDir([0, -1])
    } else if (key === 'ArrowDown' && dir[0] !== 0 && dir[1] !== -1) {
      setDir([0, 1])
    } else if (key === 'ArrowLeft' && dir[0] !== 1 && dir[1] !== 0) {
      setDir([-1, 0])
    } else if (key === 'ArrowRight' && dir[0] !== -1 && dir[1] !== 0) {
      setDir([1, 0])
    }
  }

  const createApple = (): number[] =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)))

  const checkCollision = (
    piece: number[],
    snk: number[][] = snake,
  ): boolean => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true
    }
    return false
  }

  const checkAppleCollision = (newSnake: number[][]): boolean => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple()
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple()
      }
      setApple(newApple)
      return true
    }
    return false
  }

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake)) as number[][]
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]]
    snakeCopy.unshift(newSnakeHead)
    if (checkCollision(newSnakeHead)) endGame()
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop()
    setSnake(snakeCopy)
  }

  const startGame = () => {
    setSnake(SNAKE_START)
    setApple(APPLE_START)
    setDir([0, -1])
    setSpeed(SPEED)
    setGameOver(false)
  }

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    if (context) {
      context.setTransform(SCALE, 0, 0, SCALE, 0, 0)
      context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1])
      context.fillStyle = '#1e5b5e'
      snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1))
      context.fillStyle = '#30f5fe'
      context.fillRect(apple[0], apple[1], 1, 1)
    }
  }, [snake, apple, gameOver])

  return (
    <div role="button" tabIndex={0} onKeyDown={(e) => moveSnake(e)}>
      <canvas
        style={{ border: '1px solid black' }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      {gameOver && <div>GAME OVER!</div>}

      <Button onClick={startGame} variant="contained">
        Start Game!
      </Button>
    </div>
  )
}

export default SnakeGameModal
