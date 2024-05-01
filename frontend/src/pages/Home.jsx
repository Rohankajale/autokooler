import React, { useEffect } from "react"
import useRadiatorsContext from "../hooks/useRadiatorsContext"

import RadiatorForm from "../components/RadiatorForm"
import RadiatorDetails from "../components/RadiatorDetails"

let didInit = false

const Home = () => {
    const { radiators, dispatch } = useRadiatorsContext()

    // useEffect(() => {
    //     const fetchRadiators = async () => {
    //         const response= await fetch('/api/radiators')
    //         const json = await response.json()

    //         if (!response.ok) {
    //             return
    //         }
    //         console.log(json);
    //         dispatch({ type: 'SET_RADIATORS', payload: json })
    //     }

    //     fetchRadiators()
    // }, [ dispatch ]) 


    if (!didInit) {
        const fetchRadiators = async () => {
            const response= await fetch('/api/radiators')
            const json = await response.json()

            if (!response.ok) {
                return
            }
            console.log(json);
            dispatch({ type: 'SET_RADIATORS', payload: json })
        }

        fetchRadiators()

        didInit = true
    }


    return (
        <div className = "home">
            <div className = "flex flex-row flex-wrap radiators sm:justify-center md:justify-center">
                {radiators && radiators.map(radiator => (
                    <RadiatorDetails radiator = { radiator } key = { radiator._id } />
                ))}
            </div>
            <RadiatorForm />
        </div>
    )
}

export default Home
