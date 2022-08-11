import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { ErrorContext } from './ErrorContext'
import {axiosInstance} from "../utils/axios";

const initialState = {
  lamination: null,
  laminations: [],
}

const handlers = {
  INITIALIZE: (state, action) => {
    return {
      lamination: null,
      laminations: [],
    }
  },
  SET_LAMINATION: (state, action) => {
    return {
      ...state,
      lamination: action.payload,
    }
  },
  SET_LAMINATIONS: (state, action) => {
    return {
      ...state,
      laminations: action.payload,
    }
  },
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

const LaminationContext = createContext({
  ...initialState,
  getAllLaminations: () => Promise.resolve(),
  submitLaminationStator: () => Promise.resolve(),
  submitLaminationRotor :() => Promise.resolve()
})

const LaminationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { setLaminationSubmitError } = useContext(ErrorContext)

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
  const getAllLaminations = async () => {
    try {
    } catch (error) {}
  }

  //  Submit lamination data
  const submitLaminationStator = async (data) => {
    try {
      console.log(data)
      const response1 = await axiosInstance.post('/machine/stator/', data)


      console.log(response1)
      setLaminationSubmitError(null)
    } catch (error) {
      setLaminationSubmitError({ message: 'Submit Failed' })
    }
  }
  const submitLaminationRotor = async (data) => {
    try {
      console.log(data)
      const response1 = await axiosInstance.post('/machine/rotor/', data)


      console.log(response1)
      setLaminationSubmitError(null)
    } catch (error) {
      setLaminationSubmitError({ message: 'Submit Failed' })
    }
  }
  const submitModelTree = async (data) => {
    try {
      console.log(data)
      const response1 = await axiosInstance.post('/machine/dimensions/', data)
      const response2 = await axiosInstance.post('/machine/stator/', data)
      const response3 = await axiosInstance.post('/machine/rotor/', data)

      console.log(response1,response2,response3)
      setLaminationSubmitError(null)
    } catch (error) {
      setLaminationSubmitError({ message: 'Submit Failed' })
    }
  }

  return (
    <LaminationContext.Provider
      value={{
        ...state,
        getAllLaminations,
        submitLaminationStator,
        submitLaminationRotor,
      }}
    >
      {children}
    </LaminationContext.Provider>
  )
}

export { LaminationContext, LaminationProvider }
