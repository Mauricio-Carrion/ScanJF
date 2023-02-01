import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import host from '../../api';
import axios from 'axios';

const Login = ({ navigation }) => {

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmitBtn = async () => {
    let hostAdress = await host()
    const options = {
      headers: {
        usuario: user,
        password: password
      }
    }

    console.log(user, password);

    if (user && password) {

      console.log(hostAdress);
      hostAdress ?
        axios.post(`${hostAdress}/usuario`, options)
          .then(res => {
            res.status == 200 ?
              navigation.navigate('Main')
              : ''
          })
          .catch(err => alert(err.response.data.msg))
        :
        alert('Configure o ip do servidor!')
    } else {
      alert('Digite o usuário e a senha')
    }
  }

  return (
    <View style={styles.loginBg}>
      <TouchableOpacity onPress={() => navigation.navigate('Config')} activeOpacity={0.6} underlayColor="#00A8E8" style={styles.iconSettings}>
        <Icon name="gear" size={40} color="#FFF" />
      </TouchableOpacity>

      <View style={styles.blueCircle} />

      <View style={styles.form}>
        <View style={styles.inputLabels}>
          <Icon name="user" size={20} color="#007FFF" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Usuário" onChangeText={text => setUser(text)} />
        </View>

        <View style={styles.inputLabels}>
          <Icon name="lock" size={20} color="#007FFF" style={styles.icon} />
          <TextInput secureTextEntry={true} style={styles.input} placeholder="Senha" onChangeText={text => setPassword(text)} />
        </View>
      </View>

      <TouchableHighlight
        underlayColor="#00A8E8"
        onPress={() => handleSubmitBtn()}
        style={styles.button}
        title="Entrar">
        <Text style={{ color: "#fff" }}>Entrar</Text>
      </TouchableHighlight>
    </View>
  )
};

const styles = StyleSheet.create({
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

  form: {
    position: 'absolute',
    bottom: 220
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