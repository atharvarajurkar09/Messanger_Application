import { useAuth } from "@/providers/AuthProviders";
import { FontAwesome5 } from "@expo/vector-icons";
import {  Link, Stack, useRouter } from "expo-router";
import React from "react";
import { ChannelList } from "stream-chat-expo";


export default function MainTabScreen(){
    const {user}=useAuth();
    const router=useRouter();
    return (
    <>
    <Stack.Screen
        options={{
            headerRight:()=>(
                <Link href={'/(home)/users'} asChild>
                <FontAwesome5 name='users' size={20} style={{marginHorizontal:15}}/>
                </Link>
            )
        }}/>
    <ChannelList
    filters={{members:{$in:user?[user?.id]:[]}}}
    onSelect={(channel)=>router.push({pathname:'/channel/[cid]',params:{cid:channel.cid}})}/>
    </>
    )
}