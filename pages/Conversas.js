import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import firebase from '../firebase';


function Mensagens({navigation}) {
  const [allChats, setAllChats] = useState([]);
  const [email] = useState(firebase.auth().currentUser.email);

  useEffect(() => {
    firebase
      .firestore()
      .collection('conversas')
      .orderBy('lastMsgTime',  'desc')
      .where('pessoas', 'array-contains', email)
      .onSnapshot((valor) => {
        const tmp = [];
        valor.forEach((item) => {
          const data = item.data();
          const otherUser = data.pessoas.filter((e) => e !== email);

          tmp.push({
            id: item.id,
            otherUser: otherUser,
            lastMsg: data.lastMsg,
          });
        });

        setAllChats(tmp);
      });
  }, []);

  const goMsg = (id, otherUser) => {
    navigation.navigate('Mensagens', {
      id,
      otherUser
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {allChats.map((item, index) => (
          <TouchableOpacity onPress={() => goMsg(item.id, item.otherUser)} style={styles.chatView} key={index}>
            <Text style={styles.chatName}>{item?.otherUser}</Text>
            <Text style={styles.chatPreview}>{item?.lastMsg}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  chatView: {
    borderBottomWidth: 1,
    borderColor: '#969696',
    padding: 24,
    marginHorizontal: 16
  },
  chatName: {
    fontSize: 18,
    marginVertical: 8,
    color: 'rgb(0, 140, 255)'
  }, 
  chatPreview: {
    fontSize: 16,
    color: '#969696'
  }
});

export default Mensagens;
