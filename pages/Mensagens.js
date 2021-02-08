import React, {useState, useEffect} from 'react'
import { ScrollView, Text, StyleSheet, SafeAreaView, Dimensions, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import firebase from '../firebase'

const {width, height} = Dimensions.get('window')

function Mensagens() {

  const [msg, setMsg] = useState('')
  const [allMsg, setAllMsg] = useState([])
  const [email] = useState(firebase.auth().currentUser.email)

  const send = () => {
    firebase.firestore().collection('conversas').add({
      mensagem: msg,
      timestamp: new Date().getTime(),
      author: email
    }).then(() => {
      console.log('Mensagem salva no banco de dados')
    }).catch((e) => {
      console.log(e)
    })
  }

  useEffect(() => {
    firebase.firestore().collection('conversas').orderBy('timestamp').onSnapshot((valor) => {
      const tmp = []
      valor.forEach((item) => {

        tmp.push(item.data())
      })

      setAllMsg(tmp)
    })
  }, [])

  const [scrollView, setScrollView] = useState()
  
  return (
    <SafeAreaView  style={styles.container}>
      <ScrollView
      style={styles.scrollView}
        ref={ref => setScrollView(ref)}
        onContentSizeChange={() => scrollView.scrollToEnd({animated: true})}
      >
        {allMsg.map((item, index) => (
            <Text style={item.author === email? styles.fontSender : styles.fontReciver} key={String(item?.mensagem + index)}>            
              {item?.mensagem}              
            </Text>
        ))}
      </ScrollView>
      <View style={styles.sendView}>
          <TextInput style={styles.inputMsg} mode="outlined" onChangeText={(e) => setMsg(e)} label="Mensagem" placeholder="Digite sua mensagem" value={msg} />
          <Button style={styles.buttonSend} mode="contained" onPress={() => send()}>
            Enviar
          </Button>
        </View>
    </SafeAreaView>
  )
}


const font = {
  fontSize: 22,
    margin: 16,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    padding: 12,
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  fontReciver: {
    ...font,
    alignSelf: 'flex-start',
    maxWidth: width * 0.65
  }, 
  fontSender: {
    ...font,
    alignSelf: 'flex-end',
    maxWidth: width * 0.65,
    backgroundColor: 'rgb(0, 140, 255)',
    color: '#fff',
  },
  scrollView: {
    height: height * 0.9
  },
  sendView: {
    display: 'flex',
    flexDirection: 'row',
    height: height * 0.1,
  }, 
  inputMsg: {
    width: width * 0.7
  }, 
  buttonSend: {
    width: width * 0.3
  }
})


export default Mensagens