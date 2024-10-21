import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const isFocused = useIsFocused();

  const fetchUserProfile = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error al recuperar la información del usuario:', error);
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchUserProfile();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>

        <Text style={styles.title}>Mi Perfil</Text>


      {user ? (
        <>
          <View style={styles.profileContainer}>
            {user.profileImage && (
              <Image
                source={{ uri: user.profileImage }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            )}
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Cerrar sesión" onPress={handleLogout} color="#ff4d4d" />
          </View>
        </>
      ) : (
        <Text style={styles.loading}>Cargando perfil...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffeadb', 
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginVertical: 24,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, 
    borderWidth: 3,
    borderColor: '#ff4d4d', 
    marginBottom: 20,
  },
  username: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10, 
  },
  email: {
    fontSize: 20,
    color: '#555',
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'center',
    width: '60%',
    borderRadius: 10,
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
  },
});
