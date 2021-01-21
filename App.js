import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Provider as PaperProvider, DefaultTheme, TextInput, Button } from 'react-native-paper';

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
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <StatusBar style="auto" backgroundColor="#0094FD" />

        <TextInput style={styles.textInput} mode="outlined" label="Usuário" placeholder="Digite seu usuário" />

        <TextInput style={styles.textInput} mode="outlined" label="Senha" placeholder="Digite sua senha" />

        <Button mode="contained" style={styles.button} onPress={() => console.log('Pressed')}>
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