import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { ErrorContext } from './ErrorContext'
import {axiosInstance} from "../utils/axios";

const initialState = {
    hole: null,
    holes: [],
}

const handlers = {
    INITIALIZE: (state, action) => {
        return {
            hole: null,
            holes: [],
        }
    },
    SET_HOLE: (state, action) => {
        return {
            ...state,
            hole: action.payload,
        }
    },
    SET_HOLES: (state, action) => {
        return {
            ...state,
            holes: action.payload,
        }
    },
}

const reducer = (state, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state

const HoleContext = createContext({
    ...initialState,
    getAllHoles: () => Promise.resolve(),
    submitHole: () => Promise.resolve(),
})

const HoleProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { setHoleSubmitError } = useContext(ErrorContext)

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
    const getAllHoles = async () => {
        try {
        } catch (error) {}
    }

    //  Submit slot data
    const submitHole = async (data) => {
        try {
            console.log(data)
            const response = await axiosInstance.post('/machine/hole/', data)
            console.log(response)
            setHoleSubmitError(null)
        } catch (error) {
            setHoleSubmitError({
                message: 'Submit failed',
            })
        }
    }

    return (
        <HoleContext.Provider
            value={{
                ...state,
                getAllHoles,
                submitHole,
            }}
        >
            {children}
        </HoleContext.Provider>
    )
}

export { HoleContext, HoleProvider }
