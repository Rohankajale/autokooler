import { useContext } from "react";
import { RadiatorsContext } from "../context/RadiatorsContext";

const useRadiatorsContext = () => {
    const context = useContext(RadiatorsContext)

    if(!context) {
        throw Error('Context tttt')
    }

    return context

}

export default useRadiatorsContext
