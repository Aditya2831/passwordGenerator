import { useState, useCallback, useEffect, useRef } from 'react'
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed,setnumberAllowed]=useState(false)
  const [charactersAllowed,setcharactersAllowed]=useState(false)
  const [password,setPassword]=useState("")
  const notify = () => toast("Copied Successfully!");

  const passwordGenerator=useCallback(()=>{
let pass=""
let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(numberAllowed){
  str+="0123456789"
}
if(charactersAllowed){
  str+="_!*&^%$#@{}()<>"
}

for (let index = 1; index <=length; index++) {
 // const element = array[index];
 let char=Math.floor(Math.random()*str.length+1) //provides random number between 1 and length,

 //now every number will be representing some index
 pass+=str.charAt(char);
}
setPassword(pass)
  },[length,numberAllowed,charactersAllowed,setPassword])

useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,charactersAllowed,passwordGenerator])

const copyPassword=useCallback(()=>{
  passwordRef.current?.select() //highlighting the copied text with blue bg
  window.navigator.clipboard.writeText(password)
},[password])

const passwordRef=useRef(null)
  return (
    <>
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-5 py-5 my-10  text-black bg-gray-700 text-center">

        <h1 className="text-white text-center my-3">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">

          <input type="text" 
          value={password} 
            className="outline-none w-full py-1 px-3" placeholder='password'
             readOnly
             ref={passwordRef}
          />
          <button className="outline-none bg-blue-800 text-yellow-50 px-3 py-0.5 shrink-0" onClick={()=>{
            notify();
          copyPassword();
          }}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">

          <div className="flex items-center gap-x-1">
            <input type="range"
             name="" 
             id="" 
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e)=>{setlength(e.target.value)}}
             />
             <label htmlFor="" className="text-slate-300 mr-2 pl-1">Length: {length}</label>
          </div>

          <div>
            <input type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{
              setnumberAllowed((prev)=>!prev);
            }} />
            <label htmlFor="numberInput" className="text-slate-300 mr-2 pl-1">Numbers</label>
          </div>

          <div>
            <input type="checkbox"
            defaultChecked={charactersAllowed}
            id="characterInput"
            onChange={()=>{
              setcharactersAllowed((prev)=>!prev);
            }} />
            <label htmlFor="numberInput" className="text-slate-300 pl-1">Characters</label>
          </div>

        </div>
      </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition : Slide
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        
      />
    </>
  )
}

export default App
