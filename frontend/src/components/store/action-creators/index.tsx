// Functions that dispatch actions )("Servants")

import { ActionType } from '../action-types'
import { Dispatch } from 'redux'
import { Action } from '../actions'

// Adding in <Action> after dispatch, tells typescript what dispatch is actually supposed to be

export const depositMoney = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DEPOSIT,
      payload: amount,
    })
  }
}
export const withdrawMoney = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.WITHDRAW,
      payload: amount,
    })
  }
}
export const Bankrupt = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BANKRUPT,
    })
  }
}
