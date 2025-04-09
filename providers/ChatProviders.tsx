import React, { useState } from "react";
import { PropsWithChildren } from "react";
import { useEffect } from "react";
import {StreamChat} from 'stream-chat';
import { Chat, OverlayProvider } from "stream-chat-expo";
import Constants from "expo-constants" 
import { ActivityIndicator } from "react-native";
import { useAuth } from "./AuthProviders";
import { supabase } from "@/config/dbconfig";


export default function ChatProvider({children}:PropsWithChildren){
const client=StreamChat.getInstance(Constants.expoConfig?.extra?.EXPO_STREAM_API);
const [isReady,setIsReady]=useState(false);
const { user, profile }=useAuth();
    useEffect(()=>{
        if(!profile){
            return ;
        }
        const connect=async()=>{
            await client.connectUser({
                id: profile?.id,
                name: profile.full_name,
                image: supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data.publicUrl,
            },
            client.devToken(profile?.id)
        );
        setIsReady(true)
        // const channel = client.channel("messaging", "the_park", {
        //     name: "The Park",
        //   });
        // await channel.create();
        }
        connect();
        return()=>{
            client.disconnectUser();
            setIsReady(false);
        }
    },[profile?.id]);

    if(!isReady){
        return <ActivityIndicator/>;
    }
    return(
        <OverlayProvider>
        <Chat client={client}>
        {children}
        </Chat>
        </OverlayProvider>
    )
}