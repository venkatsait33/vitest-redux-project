import { useSelector } from "react-redux"

function Navbar() {
    const like = useSelector((state) => state.likes?.likes || 0);
    const disLike = useSelector((state) => state.likes?.dislikes || 0);

    const comments = useSelector((state) => state.comment?.comments || []);
    const subscribe = useSelector((state) => state.subscribe?.subscribes || []);
    return (
        <nav className="flex shadow-lg navbar justify-evenly">
            <h1>Redux-CRUD-Operations</h1>
            <p>Subscribers: {subscribe.length}</p>
            <p>Comments: {comments.length}</p>
            <p>likes: {like}</p>
            <p>DisLikes: {disLike}</p>
        </nav>
    )
}

export default Navbar