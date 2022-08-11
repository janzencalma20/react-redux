import React, { createContext, useEffect, useReducer } from 'react'

const initialState = {
  laminationSubmitError: null,
  slotSubmitError: null,
  conductorSubmitError: null,
  holeSubmitError: null,
  housingSubmitError: null,
  coolingSubmitError:null,
  lossesSubmitError:null,

}

const handlers = {
  INITIALIZE: (state, action) => {
    return {
      laminationSubmitError: null,
      slotSubmitError: null,
      conductorSubmitError: null,
      holeSubmitError: null,
      housingSubmitError: null,
      coolingSubmitError: null,
      lossesSubmitError:null,
    }
  },
  SET_LAMINATION_SUBMIT_ERROR: (state, action) => {
    return {
      ...state,
      laminationSubmitError: action.payload,
    }
  },
  SET_SLOT_SUBMIT_ERROR: (state, action) => {
    return {
      ...state,
      slotSubmitError: action.payload,
    }
  },
  SET_CONDUCTOR_SUBMIT_ERROR: (state, action) => {
    return {
      ...state,
      conductorSubmitError: action.payload,
    }
  },
  SET_HOLE_SUBMIT_ERROR: (state, action) => {
    return {
      ...state,
      holeSubmitError: action.payload,
    }
  },
  SET_HOUSING_SUBMIT_ERROR: (state, action) => {
    return {
      ...state,
      housingSubmitError: action.payload,
    }
  },
  SET_COOLING_SUBMIT_ERROR: (state, action) => {
    return {
      ...state,
      coolingSubmitError: action.payload,
    }
  },
  SET_LOSSES_SUBMIT_ERROR: (state, action) => {
    return {
      ...state,
      lossesSubmitError: action.payload,
    }
  },
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

const ErrorContext = createContext({
  ...initialState,
  setLaminationSubmitError: () => Promise.resolve(),
  setSlotSubmitError: () => Promise.resolve(),
  setConductorSubmitError: () => Promise.resolve(),
  setHoleSubmitError: () => Promise.resolve(),
  setHousingSubmitError: () => Promise.resolve(),
  setCoolingSubmitError :() =>Promise.resolve(),
  setLossesSubmitError:()=>Promise.resolve()
})

const ErrorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      dispatch({
        type: 'INITIALIZE',
        payload: null,
      })
    }
    initialize()
  }, [])

  const setLaminationSubmitError = (errorObj) => {
    dispatch({
      type: 'SET_LAMINATION_SUBMIT_ERROR',
      payload: errorObj,
    })
  }
  const setHoleSubmitError = (errorObj) => {
    dispatch({
      type: 'SET_HOLE_SUBMIT_ERROR',
      payload: errorObj,
    })
  }

  const setHousingSubmitError = (errorObj) => {
    dispatch({
      type: 'SET_HOUSING_SUBMIT_ERROR',
      payload: errorObj,
    })
  }

  const setSlotSubmitError = (errorObj) => {
    dispatch({
      type: 'SET_SLOT_SUBMIT_ERROR',
      payload: errorObj,
    })
  }

  const setConductorSubmitError = (errorObj) => {
    dispatch({
      type: 'SET_CONDUCTOR_SUBMIT_ERROR',
      payload: errorObj,
    })
  }
  const setCoolingSubmitError = (errorObj) => {
    dispatch({
      type: 'SET_COOLING_SUBMIT_ERROR',
      payload: errorObj,
    })
  }
  const setLossesSubmitError = (errorObj) => {
    dispatch({
      type: 'SET_LOSSES_SUBMIT_ERROR',
      payload: errorObj,
    })
  }



  return (
    <ErrorContext.Provider
      value={{
        ...state,
        setLaminationSubmitError,
        setSlotSubmitError,
        setConductorSubmitError,
        setHoleSubmitError,
        setHousingSubmitError,
        setCoolingSubmitError,
        setLossesSubmitError
      }}
    >
      {children}
    </ErrorContext.Provider>
  )
}

export { ErrorContext, ErrorProvider }
