import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import host from '../../api';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmitBtn = async () => {
    let hostAdress = await host()
    const headers = {
      'usuario': user,
      'senha': password
    }

    const setUserOnStorage = async () => {
      try {
        await AsyncStorage.setItem('usuario', user)
        await AsyncStorage.setItem('senha', password)
      } catch (error) {
        alert(error)
      }
    }

    if (user && password) {
      try {
        hostAdress ?
          axios.get(`${hostAdress}/usuario`, { headers: headers })
            .then(res => {
              if (res.status == 200) {

                setUserOnStorage()

                navigation.navigate('Main')
              }
            })
            .catch(err => { alert(err.response.data.msg) })
          :
          alert('Configure o ip do servidor!')
      } catch (error) {
        console.error(error)
      }

    } else {

      setModalVisible(true)

    }

    setUser('')
    setPassword('')
  }

  return (
    <SafeAreaView style={styles.loginBg}>
      <KeyboardAvoidingView
        behavior='position'
        style={styles.container}>
        <View style={{
          width: Dimensions.get('window').width,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Config')} activeOpacity={0.6} underlayColor="#00A8E8" style={styles.iconSettings}>
            <Icon name="gear" size={40} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.blueCircle} />

          <View style={styles.form}>
            <View style={styles.inputLabels}>
              <Icon name="user" size={20} color="#007FFF" style={styles.icon} />
              <TextInput value={user} style={styles.input} placeholder="Usuário" onChangeText={text => setUser(text)} />
            </View>

            <View style={styles.inputLabels}>
              <Icon name="lock" size={20} color="#007FFF" style={styles.icon} />
              <TextInput value={password} secureTextEntry={true} style={styles.input} placeholder="Senha" onChangeText={text => setPassword(text)} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      <TouchableHighlight
        underlayColor="#00A8E8"
        onPress={() => handleSubmitBtn()}
        style={styles.button}
        title="Entrar">
        <Text style={{ color: "#fff" }}>Entrar</Text>
      </TouchableHighlight>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Usuário e senha obrigatórios</Text>
            <TouchableHighlight
              underlayColor="#00A8E8"
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </SafeAreaView >
  )
};

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 90,
    textAlign: 'center',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    position: 'absolute',
    top: 5,
    width: 10
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: "80%",
    height: 250,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  container: {
    flex: 1,
    alignItems: 'center'
  },

  form: {
    position: 'absolute',
    top: 450,
    height: 150
  },

  loginBg: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  blueCircle: {
    position: 'absolute',
    backgroundColor: '#007FFF',
    top: -200,
    width: '140%',
    height: 570,
    borderRadius: 300,
    elevation: 10,
    shadowColor: '#000',
  },

  input: {
    position: 'relative',
    height: 45,
    width: 348,
    marginTop: 45,
    borderWidth: 0,
    borderRadius: 25,
    paddingLeft: 40,
    backgroundColor: '#d9d9d9',
  },

  button: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    backgroundColor: '#007FFF',
    borderRadius: 25,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 190
  },

  icon: {
    position: 'absolute',
    left: 10,
    zIndex: 999,
    paddingTop: 44,
  },

  iconSettings: {
    position: 'absolute',
    top: 45,
    right: 20,
    zIndex: 999,
  },

  inputLabels: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }

});

export default Login;