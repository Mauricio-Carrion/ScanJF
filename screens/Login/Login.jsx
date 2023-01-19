import React from 'react';
import { StyleSheet, TextInput, Text, View, TouchableHighlight } from 'react-native';

const Login = () => {
  return (
    <View style={styles.loginBg}>
      <View style={styles.blueCircle}></View>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Usuário"></TextInput>
        <TextInput style={styles.input} placeholder="Senha"></TextInput>
      </View>
      <TouchableHighlight style={styles.button} title="Entrar">
        <Text>Entrar</Text>
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
    top: -260,
    width: '140%',
    height: 570,
    borderRadius: 300,
    elevation: 10,
    shadowColor: '#000',
  },

  form: {
    position: 'relative',
    top: 85
  },

  input: {
    position: 'relative',
    height: 45,
    width: 348,
    marginTop: 45,
    borderWidth: 0,
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#d9d9d9',
  },

  button: {
    flexDirection: 'row',
    backgroundColor: '#007FFF',
    borderRadius: 25,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 190
  }
});

export default Login;