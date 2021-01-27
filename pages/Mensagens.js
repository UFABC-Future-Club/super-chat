import React, {useState, useEffect} from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import firebase from '../firebase'

function Mensagens() {

  const [msg, setMsg] = useState('')
  const [allMsg, setAllMsg] = useState([])

  const send = () => {
    firebase.firestore().collection('conversas').add({
      mensagem: msg
    }).then(() => {
      console.log('Mensagem salva no banco de dados')
    }).catch((e) => {
      console.log(e)
    })
  }

  useEffect(() => {
    firebase.firestore().collection('conversas').onSnapshot((valor) => {
      const tmp = []
      valor.forEach((item) => {

        tmp.push(item.data())
      })

      setAllMsg(tmp)
    })
  }, [])
  
  return (
    <ScrollView>
      
      {allMsg.map((item, index) => (
        <Text style={styles.font} key={index}>{item?.mensagem}</Text>
      ))}
      <TextInput mode="outlined" onChangeText={(e) => setMsg(e)} label="Mensagem" placeholder="Digite sua mensagem" value={msg} />
      <Button mode="contained" onPress={() => send()}>
        Enviar
      </Button>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  font: {
    fontSize: 22,
    margin: 8
  }
})


export default Mensagens