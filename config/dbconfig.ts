import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import Constants  from 'expo-constants'
const supabaseUrl = Constants.expoConfig?.extra?.DATABASE_URL
const supabaseAnonKey = Constants.expoConfig?.extra?.DATABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})