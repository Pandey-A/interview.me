"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/geminiAiModal';
import { ChatSession } from '@google/generative-ai';
import { LoaderCircle } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import { json } from 'drizzle-orm/mysql-core';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
  
function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDescription, setJobDescription] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading ,setLoading] = useState(false);
    const [jsonResponse,setJsonResponse] = useState([]);
    const {user} =useUser();
    const router = useRouter();

    const onSubmit = async (e) => { 
        setLoading(true);
        e.preventDefault()
        console.log(jobPosition, jobDescription, jobExperience)
 
        const InputPrompt = "Job Position: "+jobPosition+", Job Description: "+jobDescription+", Years of Experience: "+jobExperience+", Depends on this information please give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" Interview question with Answered in Json Format, Give Question and Answered as field in JSON Model"
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp =(result.response.text()).replaceAll('```json','').replaceAll('```','') ;
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);
        

        if(MockJsonResp){
        const resp = await db.insert(MockInterview) 
        .values({
            mockId:uuidv4(),
            jsonMockResponse:MockJsonResp,
            jobPosition:jobPosition,
            jobDescription:jobDescription,
            jobExperience:jobExperience,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-YYYY')
        }).returning({mockId:MockInterview.mockId});

        console.log("Inserted Id:", resp);
        if(resp){
            setOpenDialog(false);
            router.push('/dashboard/interview/'+resp[0]?.mockId);
        }
    }
    else{
        console.log("Error");
    }
        setLoading(false);
    }


  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
      onClick={()=>setOpenDialog(true)}>
        <h2 className='font-bold text-lg text-center'>+ Add New Interview</h2>
      </div>
      <Dialog open={openDialog} >
  <DialogTrigger></DialogTrigger>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit}>
        <div>
            <h2>Add details about your current job position .job description and the number of years of experience you have in the field.</h2>
            <div className='mt-6 my-4'>
                <label>Job Role</label>
                <Input placeholder="Ex: Software Engineer ,Frontend Developer" className="w-full" required
                onChange={(event)=>setJobPosition(event.target.value)} />
            </div>
            <div className=' my-4'>
                <label>Tech Stack</label>
                <Textarea placeholder="Ex: React, Node, Express, MongoDB" className="w-full" required 
                onChange={(event)=>setJobDescription(event.target.value)} />
            </div>
            <div className='mt-6 my-4'>
                <label>Job Role</label>
                <Input placeholder="Ex: 5" type="number" className="w-full" max="100" required
                onChange={(event)=>setJobExperience(event.target.value)} />
            </div>
        </div>
        <div className='flex gap-2 justify-end'>
            <Button variant="ghost" onClick={()=> setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>
                {loading?
                <>
                <LoaderCircle className='animate-spin'/>Generating from AI</> : 'Start Interview'
            }
               </Button>
        </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default AddNewInterview
