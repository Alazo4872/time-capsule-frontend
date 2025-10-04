import { useState } from 'react'
import capsuleSchema from '../schemas/CapsuleSchema'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import './App.css'

function App() {
  const [capsules, setCapsules] = useState([])
  const {register, handleSubmit, formState: {errors}, reset} = useForm({resolver: zodResolver(capsuleSchema)})
  
  const onSubmit = (data) => {
    const now = new Date()
  const remainingDate = Math.floor((data.unlockDate.getTime() - new Date().getTime()) / (1000));

    const newCapsule = {
      title: data.title,
      message: data.message,
      unlockDate: data.unlockDate,
      createDate: now,
      visibility: data.visibility,
      remainingDate
    }
    setCapsules([...capsules, newCapsule])
    console.log(`text: ${newCapsule}, dateToShow: ${data.unlockDate}`)
    reset()
  }

  return (
    <>
       <h1 className="text-3xl font-bold">Feed</h1>
        {capsules.map((c,i) => (
          
          <div key={i}>
            <h3>Title: {c.title}</h3>
            <p>{c.message}</p>
            <p>Unlocks on: {c.unlockDate.toLocaleString()}</p>
            <p>{Math.floor(c.remainingDate/(1000))} seconds remaining</p>
          </div>
        ))}

       <h1 className="text-3xl font-bold"> 
        Create a Capsule
       </h1>
       <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text' className="border border-2 p-2 rounded" {...register("title")} placeholder='Title'/>
        {errors.title && <p>{errors.title.message}</p>}
        <input type='text' className="border border-2 p-2 rounded" {...register("message")} placeholder='Message'/>
        {errors.message && <p>{errors.message.message}</p>}
          <input type='datetime-local' id='name' {...register('unlockDate')}/>
          {errors.unlockDate && <p>{errors.unlockDate.message}</p>}
          <select {...register('visibility')}>
            <option value="public">public</option>
            <option value='private'>friends</option>
            <option value='private'>private</option>
          </select>
          <input type='submit'/>
       </form>
    </>
  )
}

export default App
