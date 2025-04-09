import { Stack } from "expo-router";

export default function ChannelScreen(){
    return(
        <Stack>
        <Stack.Screen name="[cid]" options={{ headerShown:false }}/>
        </Stack>
    )
}