import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import users from '../data/users.json'; // Asegúrate de que la ruta es correcta
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import { useRouter } from 'expo-router'; // Usa el hook de Expo Router

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para mensajes
  const router = useRouter(); // Hook para la navegación

  const handleLogin = async () => {
    const user = users.find((u) => u.username === username && u.password === password);
    
    if (user) {
      // Almacenar el usuario en AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      // Mostrar mensaje de acceso correcto
      setMessage('Acceso correcto');
      
      // Después de medio segundo, redirigir a la pantalla de perfil y borrar el mensaje
      setTimeout(() => {
        setMessage('');
        router.push('/profile'); // Navegar a la pantalla de perfil
      }, 500);
      
      // Limpiar los campos de entrada
      setUsername('');
      setPassword('');
    } else {
      setMessage('Acceso incorrecto. Por favor, verifica tu usuario y contraseña.');
      Alert.alert('Login Failed', 'Invalid username or password');
      setTimeout(() => {
        setMessage('');
      }, 500);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/4109745/pexels-photo-4109745.jpeg' }} 
      style={styles.background}
      resizeMode="cover" // Ajustar la imagen de fondo
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          <Text style={styles.label}>Nombre de usuario:</Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholderTextColor="#ccc" // Color del placeholder
          />

          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#ccc"
          />

          <Button title="Login" onPress={handleLogin} color="#1d3557" />

          {/* Mostrar mensaje de acceso o error */}
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1d3557',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#1d3557',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#1d3557',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#000',
    marginBottom: 16,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
    color: '#e63946',
  },
});
