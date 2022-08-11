import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { ErrorContext } from './ErrorContext'
import {axiosInstance} from "../utils/axios";

const initialState = {
  conductor: null,
  conductors: [],
}

const handlers = {
  INITIALIZE: (state, action) => {
    return {
      conductor: null,
      conductors: [],
    }
  },
  SET_CONDUCTOR: (state, action) => {
    return {
      ...state,
      conductor: action.payload,
    }
  },
  SET_CONDUCTORS: (state, action) => {
    return {
      ...state,
      conductors: action.payload,
    }
  },
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

const ConductorContext = createContext({
  ...initialState,
  getAllConductors: () => Promise.resolve(),
  submitConductor: () => Promise.resolve(),
})

const ConductorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { setConductorSubmitError } = useContext(ErrorContext)

  useEffect(() => {
    const initialize = async () => {
      dispatch({
        type: 'INITIALIZE',
        payload: null,
      })
    }
    initialize()
  }, [])

  //  Get all conductors
  const getAllConductors = async () => {
    try {
    } catch (error) {}
  }

  //  Submit conductor data
  const submitConductor = async (data) => {
    try {
      console.log(data)
      const response = await axiosInstance.post('/machine/conductor/', data)
      console.log(response)
      setConductorSubmitError(null)
    } catch (error) {
      setConductorSubmitError({
        message: 'Submit failed',
      })
    }
  }

  return (
    <ConductorContext.Provider
      value={{
        ...state,
        getAllConductors,
        submitConductor,
      }}
    >
      {children}
    </ConductorContext.Provider>
  )
}

export { ConductorContext, ConductorProvider }
