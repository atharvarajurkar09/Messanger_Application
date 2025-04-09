import { useAuth } from '@/providers/AuthProviders';
import { router } from 'expo-router';
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useChatContext } from 'stream-chat-expo';

interface UserProps{
    user:{
        id:string,
        full_name?:string;
    }
}

const UserListitem: React.FC<UserProps> = ({user}) => {

  const { client }=useChatContext();
  const {user:me}=useAuth();

  const startChat= async()=>{
    if (!me?.id || !user?.id) {
      console.error("User ID is missing");
      return;
    }
      const channel=client.channel("messaging",{
        members:[me.id,user.id]
      })
      await channel.watch()
      router.replace(`/(home)/channel/${channel.cid}`)
  }
  return (
    <Pressable onPress={startChat} style={style.container} >
        <Text>{user.full_name ?? "Unknown"}</Text>
    </Pressable>
  )
}

const style=StyleSheet.create({
  container:{
    padding:15,
    backgroundColor:'white',
    fontFamily:"Times New Roman",
    fontSize:40
  }
})
export default UserListitem;