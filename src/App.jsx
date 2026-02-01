import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Card from './components/Card';

function App() {
  const [userData, setUserData] = useState([]);

  const [index, setIndex] = useState(1);

  const getData = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
    setUserData(response.data)
    console.log(response.data);
  }

  useEffect(function(){
    getData()
  },[index])

  let printUserData = <h3 className='text-gray-300 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>Loading...</h3>
  if(userData.length>0){
    printUserData = userData.map(function(elem, idx){
      return <div key={idx}>
          <Card elem={elem}/>
        </div>
    })
  }

  return (
    <>
      <div className='bg-black overflow-auto h-screen p-4 text-white'>
        {/* <h1 className='fixed bg-red-500 text-6xl'>{index}</h1> */}
        <div className='flex h-[82%] flex-wrap gap-4 py-2'>
          {printUserData}
        </div>
        <div className='flex justify-center gap-6 items-center p-4'>
          <button   
            style={{opacity: index==1 ? 0.6 : 1}}
            className='bg-amber-400 text-black rounded px-4 py-2 font-semibold text-sm cursor-pointer active:scale-95'
            onClick={()=>{
              console.log("Prev Button Clicked");
              if(index>1){
                setUserData([])
                setIndex(index - 1);
              }
            }}
            >
            Prev
          </button>
          <h4>Page {index}</h4>
          <button 
            className='bg-amber-400 text-black rounded px-4 py-2 font-semibold text-sm cursor-pointer active:scale-95'
            onClick={()=>{
              console.log("Prev Button Clicked");
              setUserData([])
              setIndex(index + 1);
            }}
            >
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default App
