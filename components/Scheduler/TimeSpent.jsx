import React from 'react'

function TimeSpent({ intervals }) {
  const startedAtDate = new Date(intervals[0].started_at)
  const completedAtDate = new Date(intervals[intervals.length - 1].completed_at)
  const timeSpents = [];
  intervals.forEach(interval => {
      const startedAt = new Date(interval.started_at)
      const completedAt = new Date(interval.completed_at)
      timeSpents.push(completedAt.getTime()? completedAt.getTime() - startedAt.getTime() : completedAtDate.getTime() - startedAt.getTime());
  });
  const timeSpent = timeSpents.reduce((a, b) => a + b, 0)
  const hours = Math.floor(timeSpent / (1000 * 60 * 60))
  const minutes = Math.floor((timeSpent % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeSpent % (1000 * 60)) / 1000)
  

  return (
    <p>{hours}h {minutes}m {seconds}s spent </p>
    )
}

export default TimeSpent