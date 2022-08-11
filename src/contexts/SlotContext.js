import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { ErrorContext } from './ErrorContext'
import {axiosInstance} from "../utils/axios";

const initialState = {
  slot: null,
  slots: [],
}

const handlers = {
  INITIALIZE: (state, action) => {
    return {
      slot: null,
      slots: [],
    }
  },
  SET_SLOT: (state, action) => {
    return {
      ...state,
      slot: action.payload,
    }
  },
  SET_SLOTS: (state, action) => {
    return {
      ...state,
      slots: action.payload,
    }
  },
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

const SlotContext = createContext({
  ...initialState,
  getAllSlots: () => Promise.resolve(),
  submitSlot: () => Promise.resolve(),
})

const SlotProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { setSlotSubmitError } = useContext(ErrorContext)

  useEffect(() => {
    const initialize = async () => {
      dispatch({
        type: 'INITIALIZE',
        payload: null,
      })
    }
    initialize()
  }, [])

  //  Get all slots
  const getAllSlots = async () => {
    try {
    } catch (error) {}
  }

  //  Submit slot data
  const submitSlot = async (data) => {
    try {
      console.log(data)
      const response = await axiosInstance.post('/machine/slot/', data)
      console.log(response)
      setSlotSubmitError(null)
    } catch (error) {
      setSlotSubmitError({
        message: 'Submit failed',
      })
    }
  }

  return (
    <SlotContext.Provider
      value={{
        ...state,
        getAllSlots,
        submitSlot,
      }}
    >
      {children}
    </SlotContext.Provider>
  )
}

export { SlotContext, SlotProvider }
