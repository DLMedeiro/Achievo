// Bring back after removing local state dependency

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import Item from '../models/Item'

interface DefaultProps {
  item: Item
  updateProgress: React.Dispatch<React.SetStateAction<number>>
}
export default function AddSubtract(props: DefaultProps): JSX.Element {
  const add = () => {
    props.item.addProgress()
    props.updateProgress(props.item.getProgress())
  }

  const subtract = () => {
    props.item.removeProgress()
    props.updateProgress(props.item.getProgress)
  }

  return (
    <>
      <button onClick={add}>ADD</button>
      <button onClick={subtract}>SUBTRACT</button>
    </>
  )
}
