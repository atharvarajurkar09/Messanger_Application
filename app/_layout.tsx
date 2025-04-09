
//use for routing in the app

import AuthProviders from "@/providers/AuthProviders";
import { Slot, Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{flex:1}}>
            <AuthProviders>
            <Slot/>
            </AuthProviders>
        </GestureHandlerRootView>
    )
}

