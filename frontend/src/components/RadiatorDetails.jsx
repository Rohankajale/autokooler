import useRadiatorsContext from '../hooks/useRadiatorsContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {
    // ClerkProvider,
    SignedIn, SignedOut,
} from "@clerk/clerk-react";


const RadiatorDetails = ({ radiator }) => {
    const { name, price, stock, img } = radiator
    const { dispatch } = useRadiatorsContext()

    const handleClick = async () => {
        const response = await fetch (`/api/radiators/${ radiator._id }`, {
            method: 'DELETE'
        })

        const json = await response.json()
        if(response.ok) {
            dispatch({ type: 'DELETE_RADIATOR', payload: json })
        }
    }
    const Checkout = async (e) => {
        const response = fetch("/api/radiators/checkout-session", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            // Send along all the information about the items
            body: JSON.stringify({
                items: [
                  {
                    id: radiator._id,
                  },
                ],
              }),
            })
            .then(res => {
            if (res.ok) return res.json()
            // If there is an error then make sure we catch that
            return res.json().then(e => Promise.reject(e))
            })
            .then(({ url }) => {
            // On success redirect the customer to the returned URL
            window.location = url
            })
            .catch(e => {
            console.error(e.error)
            })
        }

    function arrayBufferToBase64(buffer) {
        let binary = ''
        const bytes = [].slice.call(new Uint8Array(buffer))
        bytes.forEach((b) => {
            binary += String.fromCharCode(b)
        })
        return window.btoa(binary)
    }
    console.log(name, price, stock, img)
    const base64String = arrayBufferToBase64(img.data.data)
    return (
        <div className="ml-10 mr-10 mb-10 card w-96 bg-base-100 shadow-xl object-contain">
        <figure className="h-full w-full object-cover"><img src = {`data:img/${img.contentType};base64,${base64String}`} alt = "radiator-img"/></figure>
        <div className="card-body" />   
        <h4 className="ml-5 mb-2 card-title">{ radiator.name }</h4>
        <p className="ml-5 mb-2"><strong>Price: </strong>{ radiator.price }</p>
        <SignedIn>
        <p className="ml-5 mb-5"><strong>Stock: </strong>{ radiator.stock }</p>
        <p className="ml-5">{formatDistanceToNow(new Date(radiator.createdAt), { addSuffix: true })}</p>
       </SignedIn>
        <div className="card-actions justify-end">
        <SignedOut>
        {/* <a href="https://buy.stripe.com/test_cN2dR68ML0ZSc6IeUU" className="mr-10 mb-5 btn btn-primary">Buy</a> */}
        {/* <span className="mr-10 mb-5 btn btn-info" onClick={ Checkout }>Buy Now</span> */}
        <button className = "snipcart-add-item mr-10 mb-5 btn btn-info"
            data-item-id = {radiator._id}
            data-item-price = { radiator.price }
            data-item-description = { radiator.stock }
            data-item-image = {`data:img/${img.contentType};base64,${base64String}`}
            data-item-url = { `https://autokooler.onrender.com/api/radiators/${ radiator._id }` }
            data-item-name = { radiator.name }
            data-config-add-product-behavior=""
            >
            Add to cart
        </button>
        </SignedOut>
        <SignedIn>
        <span className="mr-10 mb-5 btn btn-info" onClick={ handleClick }>delete</span>
        </SignedIn>
        </div>
        </div>
    )
}

export default RadiatorDetails


