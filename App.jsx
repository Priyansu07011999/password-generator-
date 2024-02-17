import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setNumAllow] = useState(false);
  const [chars, setChars] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllow){
      str+="0123456789"
    }
    if(chars){
      str += "!@#$%^&*~+=_"
    }

    for(let i= 1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numAllow, chars, setPassword])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
    document.querySelector('button').innerHTML = 'Copied';
  },[password])

  useEffect(() => {passwordGenerator()} , [length, numAllow, chars, passwordGenerator])
  

  return (
    <>
    
    <div className="w-full max-w-md max-h-3xl mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-500" >
      <h1 className='text-white text-center text-3xl'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" 
        value ={password} 
        className=' w-full py-2 px-6'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />

        <button onMouseLeave={() => document.querySelector('button').style.backgroundColor="cyan"} 
                onMouseMove={() => document.querySelector('button').style.backgroundColor="green"} 
                onClick={copyPassword} className='rounded-md bg-cyan-500 px-4 mx-3'>
                  Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label htmlFor="">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={numAllow}
          id="numberInput"
          onChange={() => {
            setNumAllow((prev) => !prev);
          }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={chars}
          id="text_input"
          onChange={() => {
            setChars((prev) => !prev);
          }}
          />
          <label htmlFor="charsInput">Characters</label>
        </div>
      </div>
    </div>

    </>
  )
}

export default App
