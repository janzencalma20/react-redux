import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { ErrorContext } from './ErrorContext'
import {axiosInstance} from "../utils/axios";

const initialState = {
  cooling: null,
  coolings: [],
}

const handlers = {
  INITIALIZE: (state, action) => {
    return {
      cooling: null,
      coolings: [],
    }
  },
  SET_COOLING: (state, action) => {
    return {
      ...state,
      cooling: action.payload,
    }
  },
  SET_COOLINGS: (state, action) => {
    return {
      ...state,
      coolings: action.payload,
    }
  },
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

const CoolingContext = createContext({
  ...initialState,
  getAllCoolings: () => Promise.resolve(),
  submitCooling: () => Promise.resolve(),
})

const CoolingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { setCoolingSubmitError } = useContext(ErrorContext)

  useEffect(() => {
    const initialize = async () => {
      dispatch({
        type: 'INITIALIZE',
        payload: null,
      })
    }
    initialize()
  }, [])

  //  Get all Cooling flowrates
  const getAllCoolings = async () => {
    try {
    } catch (error) {}
  }

  //  Submit Cooling data
  const submitCooling = async (data) => {
    try {
      console.log(data)
      const response = await axiosInstance.post('/machine/cooling/', data)
      console.log('this is response from submit button')
      console.log(response)
      setCoolingSubmitError(null)
    } catch (error) {
      setCoolingSubmitError({
        message: 'Submit failed',
      })
    }
  }

  return (
    <CoolingContext.Provider
      value={{
        ...state,
        getAllCoolings,
        submitCooling,
      }}
    >
      {children}
    </CoolingContext.Provider>
  )
}

export { CoolingContext, CoolingProvider }
