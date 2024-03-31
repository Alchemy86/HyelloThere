import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { toast } from '@/components/ui/use-toast';

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;
    
    const loadCall = async () => {
      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({ filter_conditions: { id } });

        if (calls.length > 0) setCall(calls[0]);

        setIsCallLoading(false);
      } catch (error) {
        toast({ title: 'Failed to load call'} );
        console.error(error);
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};