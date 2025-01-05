import { useDispatch, useSelector } from "react-redux"
import { clearComments, deleteComment } from "../redux/commentsSlice"
import { clearSubscribers, deleteSubscriber } from "../redux/subscriberSlice"


function Sidebar() {
  const comments = useSelector((state) => state.comment.comments)
  const subscribe = useSelector((state) => state.subscribe.subscribes)
  const dispatch = useDispatch()


  const handleDeleteComments = (index) => {
    dispatch(deleteComment(index))
  }
  const handleClearComments = () => {
    dispatch(clearComments())
  }
  const handleDeleteSubscribers = (index) => {
    dispatch(deleteSubscriber(index))
  }
  const handleClearSubscribers = () => {
    dispatch(clearSubscribers())
  }
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="border  rounded-lg h-[250px] w-full p-2 overflow-scroll">
        <div className=" flex items-center justify-between mx-auto  rounded-box w-[90%] mb-2 ">
          Comments:
          {
            comments.length > 0 && <button onClick={handleClearComments} className="btn btn-secondary btn-xs button">Clear </button>
          }

        </div>
        {
          comments.map((item, index) => {
            return (<div key={index} className="">
              <div className="flex  space-y-2 items-center justify-between mx-auto  rounded-box w-[90%]  ">
                <li>
                  {item}
                </li>


                <button onClick={() => handleDeleteComments(index)}  data-testId="delete-button" className="btn btn-error btn-xs">Delete</button>
              </div>

            </div>
            )
          })}
      </div>

      <div className="border rounded-lg h-[250px] w-full p-2 overflow-scroll">
        <div className=" flex items-center justify-between mx-auto  rounded-box w-[90%] mb-2 ">
          Subscribers:
          {
            subscribe.length > 0 && <button onClick={handleClearSubscribers} className="btn btn-secondary btn-xs ">Clear </button>
          }

        </div> {
          subscribe.map((item, index) => {
            return (<div key={index} className="">
              <div className="flex items-center justify-between mx-auto space-y-2  rounded-box w-[90%] ">
                <li>
                  {item}
                </li>
                <button onClick={() => handleDeleteSubscribers(index)} className="btn btn-error btn-xs">Delete</button>
              </div>
            </div>)
          })
        }</div>

    </div>
  )
}

export default Sidebar