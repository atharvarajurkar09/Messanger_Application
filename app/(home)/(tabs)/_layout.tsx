import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
//Tabs ka layout.tsx 
export default function TabNavigator(){
    return (
    <Tabs>
        <Tabs.Screen
        name="index"
        options={{
            title:'Chats',
            tabBarIcon:({size,color})=>(
                <FontAwesome5 name="home" size={size} color="black"/>
            )
        }} 
        />
        <Tabs.Screen
        name="profile"
        options={{
            title:'Profile',
            tabBarIcon:({size,color})=>(
                <FontAwesome5 name="user-alt" size={size} color="black"/>
            )
        }} 
        />
    </Tabs>
    );
}