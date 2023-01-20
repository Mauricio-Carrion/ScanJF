import React from 'react';
import { StyleSheet, TextInput, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {

  const handleSubmitBtn = () => {
    alert('apertou entrar')
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
          <TextInput style={styles.input} placeholder="Usuário" />
        </View>

        <View style={styles.inputLabels}>
          <Icon name="lock" size={20} color="#007FFF" style={styles.icon} />
          <TextInput secureTextEntry={true} style={styles.input} placeholder="Senha" />
        </View>
      </View>

      <TouchableHighlight
        underlayColor="#00A8E8"
        onPress={handleSubmitBtn}
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
    bottom: 300
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