import { useState } from 'react'
import FormInput from './FormInput'
import SubscribeForm from './SubscrimeForm'
import { useDispatch } from 'react-redux'
import { addLike, disLike } from '../redux/likesSlice'
import image from '../assets/redux toolkit.webp'

const PostDisplay = () => {
    const [comment, setComment] = useState(false)
    const [subscribe, setSubscribe] = useState(false)
    const dispatch = useDispatch()
    const handleLike = () => {
        dispatch(addLike())
    }
    const handleDisLike = () => {
        dispatch(disLike())
    }
    return (
        <div className=' flex  flex-col mx-auto border rounded h-[500px] '>
            <div>
                <img src={image} alt="" className='object-cover h-[250px] p-2 mx-auto rounded ' />
                <div className="flex items-center justify-between p-4 mt-4 ">
                    <button className="btn btn-outline" onClick={handleLike}>Like</button>
                    <button className="btn btn-outline" onClick={handleDisLike}>Dis-Like</button>
                    <button className="btn btn-outline" onClick={() => setComment(!comment)}>comment</button>
                    <button className="btn btn-outline" onClick={() => setSubscribe(!subscribe)}>subscribe</button>
                </div>
            </div>

            <div >
                {comment && <FormInput />}
                {subscribe && <SubscribeForm />}
            </div>
        </div>
    )
}

export default PostDisplay