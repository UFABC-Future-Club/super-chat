import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-paper';
import firebase from '../firebase';

const { width, height } = Dimensions.get('window');

function Mensagens({ route, navigation }) {
  const [msg, setMsg] = useState('');
  const [allMsg, setAllMsg] = useState([]);
  const [email] = useState(firebase.auth().currentUser.email);

  const send = () => {
    if (msg) {
      const msgTime = new Date().getTime();
      const tmpMsg = msg;

      setMsg('')


      firebase
        .firestore()
        .collection('conversas')
        .doc(route.params.id)
        .collection('msg')
        .add({
          mensagem: tmpMsg,
          timestamp: msgTime,
          author: email,
        })
        .then(() => {
          firebase
            .firestore()
            .collection('conversas')
            .doc(route.params.id)
            .update({
              lastMsg: tmpMsg,
              lastMsgTime: msgTime,
            })
        });
    }
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection('conversas')
      .doc(route.params.id)
      .collection('msg')
      .orderBy('timestamp')
      .onSnapshot((valor) => {
        const tmp = [];
        valor.forEach((item) => {
          tmp.push(item.data());
        });

        setAllMsg(tmp);
      });

    navigation.setOptions({
      title: route.params.otherUser,
    });
  }, []);

  const [scrollView, setScrollView] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        ref={(ref) => setScrollView(ref)}
        onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}
      >
        {allMsg.map((item, index) => (
          <TouchableOpacity
            style={
              item.author === email ? styles.viewSender : styles.viewReciver
            }
          >
            <Text
              style={
                item.author === email ? styles.fontSender : styles.fontReciver
              }
              key={index}
            >
              {item?.mensagem}
            </Text>

            <Text style={
               item.author === email ? styles.msgTimeSender : styles.msgTimeReciver
            }>{new Date(item.timestamp).toLocaleTimeString('pt-BR')}</Text>

          </TouchableOpacity>
     
        ))}
      </ScrollView>
      <View style={styles.sendView}>
        <TextInput
          style={styles.inputMsg}
          onChangeText={(e) => setMsg(e)}
          placeholder="Mensagem"
          value={msg}
        />
        <Button
          style={styles.buttonSend}
          labelStyle={{ fontSize: 18 }}
          onPress={() => send()}
          disabled={msg ? false : true}
        >
          Enviar
        </Button>
      </View>
    </SafeAreaView>
  );
}

const msgTouch = {
  margin: 16,
  borderWidth: 1,
  borderColor: '#969696',
  borderStyle: 'solid',
  padding: 12,
  borderRadius: 16,
  maxWidth: width * 0.65,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  viewReciver: {
    ...msgTouch,
    alignSelf: 'flex-start',
    maxWidth: width * 0.65,
  },
  fontReciver: {
    fontSize: 22,
  },
  fontSender: {
    fontSize: 22,
    color: '#fff',
  },
  viewSender: {
    ...msgTouch,
    alignSelf: 'flex-end',
    maxWidth: width * 0.65,
    backgroundColor: 'rgb(0, 140, 255)',
  },
  scrollView: {
    height: height * 0.9,
  },
  sendView: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: width * 0.05,
    height: height * 0.1,
    borderTopWidth: 1,
    borderColor: '#969696',
    borderStyle: 'solid',
    paddingTop: 32,
  },
  inputMsg: {
    width: width * 0.65,
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  buttonSend: {
    width: width * 0.3,
    alignSelf: 'flex-start',
  },
  msgTimeSender: {
    fontSize: 13,
    alignSelf: 'flex-end',
    opacity: 0.65,
    color: '#fff'
  },
  msgTimeReciver: {
    fontSize: 13,
    alignSelf: 'flex-end',
    opacity: 0.65
  }
});

export default Mensagens;
