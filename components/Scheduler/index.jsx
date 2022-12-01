import React, {useState, useEffect} from 'react'
import Form from './Form'
import Card from './Card'

import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(r => r.json())

function index() {
  const {data, error} = useSWR('/api/scheduler', fetcher)

  const [tasks, setTasks] = useState(data)

  const [completedTasks, setCompletedTasks] = useState([])
  const [activeTasks, setActiveTasks] = useState([])

  let completed;

  useEffect(() => {
    if(!data) {
      setTasks([])
    }
    if(data !== undefined && data.error !== 'Not authenticated') {
      setTasks(data)
      completed = data?.filter(task => 
        task.intervals[task.intervals.length - 1].completed_at !== null
        )
    }
  }, [data])

  useEffect(() => {   
      if (tasks) {
        setCompletedTasks(tasks.filter(task => 
          task.completed_at !== null
          ))
        setActiveTasks(tasks.filter(task =>
          task.completed_at === null
          ))
    }
  }, [tasks])

  function handleFilter(e){
    const filter = e.target.value
    if(filter === 'all') {
      setCompletedTasks(tasks.filter(task => 
        task.completed_at !== null
        ))
      setActiveTasks(tasks.filter(task => 
        task.completed_at === null
        ))
    }
    
    if(filter === 'active') {
      setActiveTasks(tasks.filter(task => 
        task.completed_at === null
        ))
      setCompletedTasks([])
    }

    if(filter === 'completed') {
      setCompletedTasks(tasks.filter(task =>
        task.completed_at !== null
        ))
      setActiveTasks([])
    }

  }

  return (
    <div>
    <div className="my-10">
        <Form />
    </div>
    <div className="container-lg mx-auto shadow-md flex justify-between items-center gap-4 p-4 bg-white rounded-lg">
      <div>
        <p>Filter</p>
      </div>
      <div>
        <select className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none" onChange={handleFilter}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
    
    <div className='my-6'>
      <div className="flex flex-col gap-6">
        {activeTasks.map(task => (
             <Card key={task._id} task={task}/>
          ))}
      </div>
    </div>
    
    {completedTasks.length > 0 && activeTasks.length > 0 && (
      <div className="container-lg mx-auto">
        <div className="w-full border border-gray-300 h-min"></div>
      </div>
    )}

    <div className='my-6'>
        <div className="flex flex-col gap-6">
          {completedTasks.map(task => (
              <Card key={task._id} task={task}/>
            ))}
        </div>
      </div> 
</div>
  )
}

export default index