
function Input({ Value, handleChange, handleSubmit, text }) {
  return (
    <div className = "flex gap-3  mx-auto w-full h-full items-center justify-center m-10" >
      <input type="text" value={Value} onChange={handleChange} className=" input input-bordered input-primary w-full max-w-xs" />
            <button onClick={handleSubmit} className=" btn btn-outline">{text}</button>
        </div >
  )
}

export default Input