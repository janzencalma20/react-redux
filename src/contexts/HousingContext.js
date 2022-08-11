import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { ErrorContext } from './ErrorContext'
import {axiosInstance} from "../utils/axios";

const initialState = {
  housing: null,
  housings: [],
}

const handlers = {
  INITIALIZE: (state, action) => {
    return {
      housing: null,
      housings: [],
    }
  },
  SET_HOUSING: (state, action) => {
    return {
      ...state,
      housing: action.payload,
    }
  },
  SET_HOUSINGS: (state, action) => {
    return {
      ...state,
      housings: action.payload,
    }
  },
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

const HousingContext = createContext({
  ...initialState,
  getAllHousings: () => Promise.resolve(),
  submitHousing: () => Promise.resolve(),
})

const HousingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { setHousingSubmitError } = useContext(ErrorContext)

  useEffect(() => {
    const initialize = async () => {
      dispatch({
        type: 'INITIALIZE',
        payload: null,
      })
    }
    initialize()
  }, [])

  //  Get all laminations
  const getAllHousings = async () => {
    try {
    } catch (error) {}
  }

  //  Submit lamination data
  const submitHousing = async (data) => {
    try {
      console.log(data)
      const response = await axiosInstance.post('/machine/housing/', data)
      console.log(response)
      setHousingSubmitError(null)
    } catch (error) {
      setHousingSubmitError({ message: 'Submit Failed' })
    }
  }

  return (
    <HousingContext.Provider
      value={{
        ...state,
        getAllHousings,
        submitHousing,
      }}
    >
      {children}
    </HousingContext.Provider>
  )
}

export { HousingContext, HousingProvider }
