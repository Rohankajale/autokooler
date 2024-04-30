import { createContext, useReducer } from 'react'

export const RadiatorsContext = createContext()

export const radiatorsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_RADIATORS':
            return {
                radiators: action.payload
            }
        case 'CREATE_RADIATOR':
            return {
                radiators: [action.payload, ...state.radiators]
            } 
        case 'DELETE_RADIATOR':
            return {
                radiators: state.radiators.filter((radiator) => radiator._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const RadiatorsContextProvider = ({ children }) => {
    const[state, dispatch] = useReducer(radiatorsReducer, {
        radiators: null
    })

    return (
        <RadiatorsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </RadiatorsContext.Provider>
    )
}
