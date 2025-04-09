import { useAuth } from "@/providers/AuthProviders";
import ChatProvider from "@/providers/ChatProviders";
import { Redirect, Slot, Stack } from "expo-router";

export default function HomeLayout(){
    const {user}=useAuth();
    
        if(!user){
            return <Redirect href= "/(auth)/login" />
        }
    return (
            <ChatProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown:false }}/>
            </Stack>
            </ChatProvider>
);
}