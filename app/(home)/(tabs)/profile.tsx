import { useState, useEffect } from 'react'
import { supabase } from '../../../config/dbconfig'
import { StyleSheet, View, Alert, ScrollView, TouchableOpacity, Text } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'
import { useAuth } from '@/providers/AuthProviders'
import Avatar from '../../../config/profileConfig'

export default function Profile() {

    const { session }=useAuth();

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [full_name, setFullname] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url,full_name`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
        setFullname(data.full_name)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    avatar_url,
    full_name
  }: {
    username: string
    avatar_url: string
    full_name:string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        full_name,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
      
  
    <View style={{alignItems: 'center'}}>
      <Avatar
        size={200}
        url={avatarUrl}
        onUpload={(url: string) => {
          setAvatarUrl(url)
          updateProfile({username,full_name,avatar_url: url })
        }}
      />
  </View>

        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Full Name" value={full_name || ''} onChangeText={(text) => setFullname(text)} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
  <TouchableOpacity
    onPress={() => updateProfile({ username, avatar_url: avatarUrl, full_name })}
    disabled={loading}
    style={[styles.button, loading && styles.disabledButton]} // Apply styles
  >
    <Text style={styles.buttonText}>{loading ? "Loading ..." : "Update"}</Text>
  </TouchableOpacity>
</View>

<View style={styles.verticallySpaced}>
  <TouchableOpacity
    onPress={() => supabase.auth.signOut()}
    style={styles.button}
  >
    <Text style={styles.buttonText}>Sign Out</Text>
  </TouchableOpacity>
</View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    backgroundColor: 'rgb(90, 62, 226)',  // Blue color
    paddingVertical: 10, 
    paddingHorizontal: 20,
    borderRadius: 8, // Small border radius
    alignItems: 'center', // Center text
    justifyContent: 'center', // Center text vertically
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // Gray color when disabled
  },
})