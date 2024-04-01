'use client';

import React, { useState } from 'react'
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModel from './MeetingModel';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import ReactDatePicker from 'react-datepicker';

    const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const router = useRouter();

    const { user } = useUser();
    const client = useStreamVideoClient();

    const [values, setvalues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    });

    const [callDetails, setcallDetails] = useState<Call>()
    const { toast } = useToast();

    const createMeeting = async () =>
    {
        if (!user || !client)
            return;

        try {

            if (!values.dateTime) {
                toast({ title: 'Please select a date and time'}) 
                return;
            }

            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error('Failed to create call');

            const startsAt  = values.dateTime.toISOString() ||
                new Date(Date.now()).toISOString();
            const description  = values.description || 'instant meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            });

            setcallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }
            toast({ title: 'Meeting Created'}) 

        } catch (error) {
            console.log(error);
            toast({
                title: "Failed to create meeting"
              })
        }
    }   

    const meetingLink = `process.env.NEXT_PUBLIC_BASE_URL/meeting/${callDetails?.id}`

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

            <HomeCard 
                img='/icons/add-meeting.svg' 
                title='New Meeting'
                description='Start an instant meeting' 
                className = 'bg-orange-1'
                handleClick={() => setMeetingState('isInstantMeeting')}/>
            <HomeCard 
                img='/icons/schedule.svg' 
                title='Schedule Meeting'
                description='Plan your meeting' 
                className = 'bg-blue-1'
                handleClick={() => setMeetingState('isScheduleMeeting')}/>
            <HomeCard 
                img='/icons/recordings.svg' 
                title='View Recordings'
                description='Check out your recordings' 
                className = 'bg-purple-1'
                handleClick={() => router.push('/recordings')}/>
            <HomeCard 
                img='/icons/join-meeting.svg' 
                title='JOin Meeting'
                description='Via invitation link' 
                className = 'bg-yellow-1'
                handleClick={() => setMeetingState('isJoiningMeeting')}/>

            {!callDetails ? 
                <MeetingModel
                    isOpen = {meetingState === 'isScheduleMeeting'}
                    onClose = {() => setMeetingState(undefined)}
                    title = 'Create Meeting'
                    className = 'text-center'
                    buttonText = 'Schedule Meeting'
                    handleClick = {createMeeting}
                >
                    <div className='flex flex-col gap-2.5'>
                        <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Add a description
                        </label>
                        <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
                            onChange={(e) => {
                                setvalues({...values, description: e.target.value })
                            }}/>
                    </div>
                    <div className='flex w-full flex-col gap-2.5'>
                        <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Select date and time
                        </label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => {
                                setvalues({...values, dateTime: date!})
                            }}
                            className='w-full rounded bg-dark-3 focus:outline-none'
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            timeCaption='Time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                    </div>
                </MeetingModel> : 
                <MeetingModel
                    isOpen = {meetingState === 'isScheduleMeeting'}
                    onClose = {() => setMeetingState(undefined)}
                    title = 'Meeting Created'
                    className = 'text-center'
                    handleClick = {() => {
                       navigator.clipboard.writeText(meetingLink)
                       toast({title: 'Link Copied'});
                    }}
                    image='/icons/checked.svg'
                    buttonText = 'Copy Meeting Link'
                    buttonIcon='/icons/copy.svg'
                />
            }

            <MeetingModel
                isOpen = {meetingState === 'isInstantMeeting'}
                onClose = {() => setMeetingState(undefined)}
                title = 'Start an Instant Meeting'
                className = 'text-center'
                buttonText = 'Start Meeting'
                handleClick = {createMeeting}
            />
        
        </section>
    )}

export default MeetingTypeList