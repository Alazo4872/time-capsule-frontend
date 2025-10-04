import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [date, setDate] = useState('')
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [capsules, setCapsules] = useState([])
  const textChange = (event) => {
    setText(event.target.value)
    console.log(event.target.value)
  }
  const dateChange = (event) => {
    setDate(event.target.value)
    console.log(event.target.value)
  }
  const titleChange = (event) => {
    setTitle(event.target.value)
    console.log(event.target.value)
  }
  const clickSubmit = (event) => {
    event.preventDefault()
    const endDate = new Date(date)
    const nowDate = new Date()
    const remainingDate = endDate - nowDate
    if(!text.trim()){
      window.alert('Must input texts')
      return
    }
    if(!title.trim()){
      window.alert('Must input title')
      return
    }
    if(!date){
      window.alert('Must input date')
      return
    }
    
    if(remainingDate<0){
      window.alert('Date must be in the future')
      return
    }
    const newCapsule = {
      title,
      text,
      date,
      remainingDate
    }
    setCapsules([...capsules, newCapsule])
    setTitle('');
    setText('');
    setDate('');  
    
    console.log(`text: ${newCapsule}, dateToShow: ${date}`)
  }

  return (
    <>
       <h1 className="text-3xl font-bold">Feed</h1>
        {capsules.map((c,i) => (
          
          <div key={i}>
            <h3>Title: {c.title}</h3>
            <p>{c.text}</p>
            <p>Unlocks on: {c.date}</p>
            <p>{Math.floor(c.remainingDate/(1000*60*60*24))} days remains</p>
          </div>
        ))}

       <h1 className="text-3xl font-bold"> 
        Create a Capsule
       </h1>
       <form onSubmit={(e) => clickSubmit(e)}>
        <input type='text' className="border border-2 p-2 rounded" onChange={(e)=> titleChange(e)} value={title}>
        </input>
        <input type='text' className="border border-2 p-2 rounded" onChange={(e)=> textChange(e)} value={text}>
        </input>
          <input type='date' id='name' value={date} onChange={(e) => dateChange(e)}>

          </input>
          <button type='submit'>Submit</button>
       </form>
    </>
  )
}

export default App
