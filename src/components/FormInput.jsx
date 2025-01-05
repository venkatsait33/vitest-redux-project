import { useState } from "react"
import { useDispatch } from "react-redux"
import { addComment } from "../redux/commentsSlice"
import Input from "./Input"

function FormInput() {
    const [comment, setComments] = useState('')
    const dispatch = useDispatch()

    const handleComment = (e) => {
        setComments(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // handle comment submission
        dispatch(addComment(comment))
        setComments('')

    }

    return (
        <div>
            <Input Value={comment} handleChange={handleComment} handleSubmit={handleSubmit} text="Comment" />
        </div>

    )
}

export default FormInput