import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

const Config = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: '#007FFF', fontSize: 25 }}>IP do Servidor</Text>
      <TextInput style={styles.input} />

      <View style={styles.buttons}>
        <TouchableHighlight style={styles.btnVoltar}>
          <Text>Voltar</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.btnVoltar}>
          <Text>Salvar</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: 50,
    marginLeft: 25,
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
    width: '100%'
  },

  btnSalvar: {
    margin: 15,
    textAlign: 'center',
    justifyContent: 'center'
  },

  btnVoltar: {
    margin: 15,
    textAlign: 'center',
    justifyContent: 'center'
  },
})

export default Config