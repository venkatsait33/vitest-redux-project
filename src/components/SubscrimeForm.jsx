import { useState } from "react"
import { useDispatch } from "react-redux"
import { addSubscribe } from "../redux/subscriberSlice"
import Input from "./Input"

function SubscribeForm() {
    const [subscribe, setSubscribe] = useState('')
    const dispatch = useDispatch()

    const handleSubscribe = (e) => {
        setSubscribe(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // handle subscribe submission
        dispatch(addSubscribe(subscribe))
        setSubscribe('')
    }

    return (
        <div className="flex items-center justify-center w-full h-full gap-3 m-10 mx-auto" >
            <input type="text" value={subscribe} onChange={handleSubscribe}  placeholder="Enter your name" className="w-full max-w-xs input input-bordered input-primary" />
            <button onClick={handleSubmit} className=" btn btn-outline">Subscribe</button>
        </div >
    )
}

export default SubscribeForm