'use client';

import Image from 'next/image';
import React, { useState } from 'react'
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModel from './MeetingModel';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"


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
        console.log('FIRE', user, client);
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