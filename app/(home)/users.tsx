import { supabase } from "@/config/dbconfig";
import { useAuth } from "@/providers/AuthProviders";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import UserListitem from "@/config/userListitem"; // Ensure 'U' is capital

export default function UsersScreen() {
    const [users, setUsers] = useState<{ full_name?: string,id:string }[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            let { data: profiles, error } = await supabase
                .from("profiles")
                .select("*")
                .neq("id", user?.id);
            setUsers(profiles ?? []);
        };
        fetchUser();
    }, []);

    return (
        <FlatList
            data={users}
            contentContainerStyle={{gap:5}}
            renderItem={({ item }) => <UserListitem user={item} />} 
        />
    );
}
