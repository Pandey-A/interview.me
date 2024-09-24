"use client";
import  useSpeechToText  from 'react-hook-speech-to-text'
import Image from 'next/image'
import Camera from '../../../../../../../public/webcam.png'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/geminiAiModal';
import { db } from '@/utils/db';
import { UserAnswer, UserAnswers } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnsSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
    const[userAnswer,setUserAnswer]=useState('');
    const {user} =useUser();
    const [loading,setLoading] = useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(() => {
        results.map((results)=>
        (
            setUserAnswer(prevAns=>prevAns+results?.transcript)
        ));
        
      },[results])

      useEffect(()=>{
        if(!isRecording&&userAnswer.length>10){
          UpdateUserAnswerInDb();
        }
      },[userAnswer])

    const StartStopRecording=async ()=>{
      if(isRecording){
        
        stopSpeechToText();

      }
      else{
        startSpeechToText();
      }
    }

    const UpdateUserAnswerInDb=async ()=>{
      
      setLoading(true);

      const feedbackPrompt= "Question:"+mockInterviewQuestion[activeQuestionIndex]?.question +
      ", UserAnswer:"+userAnswer+", Depends on the question and user answer for given interview question" +
      "Please give us rating for answer and feedback as area of improvement if any"+
      "in just 3 to 5 line to improve it in JSON format with rating field and feedback field"

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp =(result.response.text()).replaceAll('```json','').replaceAll('```','') ;
      console.log(mockJsonResp);
      const JsonFeedbackResp =JSON.parse(mockJsonResp);

      const resp=await db.insert(UserAnswers).values({
        mockIdRef:interviewData?.mockId,
        question:mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns:userAnswer,
        feedback:JsonFeedbackResp?.feedback,
        rating:JsonFeedbackResp?.rating,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-YYYY'),

      })
      
      if(resp){
        toast('User answer recorder successfully');
        setUserAnswer('');
        setResults([])
      }
      setResults([])
      
      setLoading(false);
    }

      
  return (
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={Camera} width={500} height={300} alt="webcam" className='absolute'/>
      <Webcam
      mirrored={true}
      style={
        {
            height:400,
            width:"100%",
            zIndex:20,
        }
      }/>

    </div>
    <Button 
    disabled={loading}
    variant="outline" className="mt-20 "
    onClick={StartStopRecording}
    >
        {isRecording?
        <h2 className='text-red-600 flex gap-2 '>
            <StopCircle/> Stop Recording
        </h2>
        :
        'Record Answer'}</Button>

        
   
    </div>
  )
}

export default RecordAnsSection
