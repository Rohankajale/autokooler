import {useState} from 'react'
// import useRadiatorsContext from '../hooks/useRadiatorsContext'
import useCreateRadiator from '../hooks/useCreateRadiator'

import {
    // ClerkProvider,
    SignedIn,
} from "@clerk/clerk-react";

const RadiatorForm = () => {
    const { error, isLoading, createRadiator } = useCreateRadiator()

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [img, setImg] = useState(null)
    const [imgPath, setImgPath] = useState('')
    // const [error, setError] = useState(null)
    const [emptyfields] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = createRadiator(name, price, stock, img)

        if(success) {
            setName('')
            setPrice('')
            setStock('')
            setImg(null)
            setImgPath ('')
        }
    }

    return (
        <SignedIn>
        <form className="flex ml-4 mb-4 gap-4" onSubmit={ handleSubmit }>
            <label>Name: </label>
            <input 
            type = "text"
            onChange = { (e) => setName(e.target.value) }
            value = { name }
            className = {`${emptyfields.includes('name') ? error : ''} input input-bordered input-info w-full max-w-xs`}
            />

            <label>Price: </label>
            <input
            type = "text"
            onChange = { (e) => setPrice(e.target.value) }
            value = { price }
            className = {`${emptyfields.includes('price') ? error : ''} input input-bordered input-info w-full max-w-xs`}
            />

            <label>Stock: </label>
            <input
            type = "text"
            onChange = { (e) => setStock(e.target.value) }
            value = { stock }
            className = {`${emptyfields.includes('stock') ? error : ''} input input-bordered input-info w-full max-w-xs`}
            />

            <label>Upload: </label>
            <input
            type = "file"
            onChange = { (e) => { 
                setImg(e.target.files[0])
                setImgPath(e.target.value) 
            }}
            value = { imgPath }
            className="file-input file-input-bordered w-full max-w-xs width-100"            
            />

            <button onClick={handleSubmit} disabled = { isLoading } className="btn">Add Radiator</button>
            {error && <div className="error">{ error }</div>}

        </form>
        </SignedIn>       
    )
}


export default RadiatorForm
