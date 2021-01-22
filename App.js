import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Provider as PaperProvider, DefaultTheme, TextInput, Button } from 'react-native-paper';
import firebase from './firebase'

const altura = Dimensions.get('screen').height

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0094FD'
  },
};

function App() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  function login() {
    const auth = firebase.auth().signInWithEmailAndPassword(email, senha)

    auth.then(() => {
      console.log("Sucesso!!!")
    }).catch((erro) => {
      console.log(erro)
    })
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <StatusBar style="auto" backgroundColor="#0094FD" />

        <TextInput onChangeText={(e) => setEmail(e)} style={styles.textInput} mode="outlined" label="Usuário" placeholder="Digite seu usuário" value={email} />

        <TextInput onChangeText={(e) => setSenha(e)} style={styles.textInput} mode="outlined" secureTextEntry={true} label="Senha" placeholder="Digite sua senha" value={senha} />

        <Button mode="contained" style={styles.button} onPress={() => login()}>
          Entrar
        </Button>
      </View>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: '75%',
    height: altura * 0.075,
    marginTop: 32,
  },
  button: {
    width: '75%',
    borderRadius: 8,
    marginTop: 32,
  }
})

export default App