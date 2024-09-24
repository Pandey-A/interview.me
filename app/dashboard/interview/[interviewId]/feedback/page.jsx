"use client";
import { db } from '@/utils/db'
import { UserAnswers } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';



function Feedback({params}) {

  const [feedbackList,setFeedbackList]=useState();
  const router=useRouter();

  useEffect(()=>{
    GetFeedback();
  },[])

  const GetFeedback=async()=>{
    const result=await db.select()
    .from(UserAnswers)
    .where(eq(UserAnswers.mockIdRef,params.interviewId))
    .orderBy(UserAnswers.id);

    console.log(result);
    setFeedbackList(result);
  }
  return (
    <div className='p-10'>


     {feedbackList?.length==0?
     <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record Found</h2>
     :
     <>
           <h2 className='text-5xl font-bold text-green-500'>Congratulations !!!</h2>
           <h2 className='font-bold text-2xl my-2'>Here is your interview feedback</h2>
      


      <h2 className='text-sm text-gray-500 my-2'>Find below interview question with correct answer ,your answer and feedback for improvement</h2>

      {feedbackList&&feedbackList.map((item,index)=>(
        <Collapsible key={index}>
        <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-10 w-full'>
        {item.question} <ChevronsUpDownIcon className='h-10 w-6'/>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className='flex flex-col gap-2 my-3'>
            <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
            <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer:</strong>{item.userAns}</h2>
            <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer:</strong>{item.correctAns}</h2>
            <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-black'><strong>Feedback:</strong>{item.feedback}</h2>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      ))}
      
      </>}

      <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
      
    </div>
  )
}

export default Feedback
