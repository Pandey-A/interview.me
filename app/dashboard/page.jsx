import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Header from './_components/Header'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl'></h2>
      <h2>Create and Start Your Mock Interview</h2>
      <div className='grid grid-col-1 md:grid-cols-3 my-5'>
      <AddNewInterview />
      </div>
      <InterviewList/>
    </div>
  )
}

export default Dashboard
