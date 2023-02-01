import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Config = ({ navigation }) => {

  useEffect(() => {
    const getIp = async () => {
      try {
        const value = await AsyncStorage.getItem('@IP')
        if (value !== null) {
          setIpData(value)
        }
      } catch (error) {
        alert(error)
      }
    }

    getIp()
  }, [])

  const [ipData, setIpData] = useState('')

  const setIp = async (value) => {
    try {
      await AsyncStorage.setItem('@IP', value)
      navigation.navigate('Login')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: '#007FFF', fontSize: 25 }}>IP do Servidor</Text>
      <TextInput style={styles.input} value={ipData} keyboardType="numeric" onChangeText={text => setIpData(text)} />

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.btnVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: '#007FFF' }}>Voltar</Text>
        </TouchableOpacity>

        <TouchableHighlight style={styles.btnSalvar} onPress={evt => setIp(ipData)}>
          <Text style={{ color: '#fff' }}>Salvar</Text>
        </TouchableHighlight>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 25,
    marginRight: 25,
  },

  input: {
    backgroundColor: '#d9d9d9',
    marginTop: 20,
    marginBottom: 20,
    width: '85%',
    padding: 10,
    height: 40,
    borderRadius: 25
  },

  buttons: {
    flexDirection: 'row',
    position: 'absolute',

    bottom: 100,
    justifyContent: 'center',
    alignSelf: 'center'
  },

  btnSalvar: {
    margin: 15,
    padding: 10,
    width: 100,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#007FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },

  btnVoltar: {
    margin: 15,
    padding: 10,
    width: 100,
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#007FFF',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default Config