import { useState } from "react"
import useRadiatorsContext from "./useRadiatorsContext"

const useCreateRadiator = () => {
    const { dispatch } = useRadiatorsContext()

    const [error, setError] = useState()
    const [isLoading, setLoading] = useState(false)

    const createRadiator = async (name, price, stock, img) => {
        setLoading(true)

        const formData = new FormData()

        formData.append('name', name)
        formData.append('price', price)
        formData.append('stock', stock)
        formData.append('image', img)

        const response = await fetch('/api/radiators', {
            method: 'POST',
            body: formData
        }) 
        console.log(response)
        const json = await response.json()

        setLoading(false)
        if(response.ok) {
            dispatch({ type: 'CREATE_RADIATOR', payload: json })
            return true
        }

        setError(json.error)
        return false
    }

    return { error, isLoading, createRadiator }
}

export default useCreateRadiator