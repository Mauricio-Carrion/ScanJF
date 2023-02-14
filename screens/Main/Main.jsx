import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import host from '../../api';
import axios from 'axios';

const Main = ({ navigation }) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [hasPermission, setHasPermission] = useState(null)
  const [scanStatus, setScanStatus] = useState(false)
  const [productData, setProductData] = useState(null)
  const [newQtd, setNewQtd] = useState(0)

  useEffect(() => {
    const askForCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status == 'granted')
    }

    askForCameraPermission()

    getUserOnStorage()
  }, [])

  const getUserOnStorage = async () => {
    try {
      setUser(await AsyncStorage.getItem('usuario'))
      setPassword(await AsyncStorage.getItem('senha'))
    } catch (error) {
      alert(error)
    }
  }

  const getProduct = async (code) => {
    const hostAdress = await host()

    const headers = {
      'user': user,
      'password': password
    }

    console.log(`${hostAdress}/produto/${code}`);
    await axios.get(`${hostAdress}/produto/${code}`, { headers: headers })
      .then(res => setProductData(res.data))
      .catch(error => console.error(error))
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanStatus(false)
    getProduct(data)
  };

  const removeUserOnStorage = async () => {
    try {
      await AsyncStorage.removeItem('usuario')
      await AsyncStorage.removeItem('senha')
      navigation.navigate('Login')
    } catch (error) {
      alert(error)
    }
  }

  const handleCancelEdit = () => {
    setProductData(null)
    setNewQtd(0)
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.topBar}>
        <TouchableOpacity title='logout' style={styles.logout} onPress={removeUserOnStorage}>
          <Icon name="logout" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.cameraView} onPress={() => setScanStatus(true)}>
        {
          hasPermission && scanStatus ?
            <BarCodeScanner
              onBarCodeScanned={scanStatus ? handleBarCodeScanned : undefined}
              style={{ width: 460, height: 465 }}
            />
            :
            <>
              <Icon name='barcode-scan' size={80} color="#007FFF" />
              <Text style={{ color: "#007FFF", fontSize: 20, margin: 10 }}>Consultar produto</Text>
            </>
        }
      </TouchableOpacity>

      <View style={styles.obsView}>
        {scanStatus && <Button title={'Cancelar'} onPress={() => setScanStatus(false)} />}

        <View style={styles.obsRows}>
          <Text style={styles.rowsTitle}>Código:</Text>
          <Text style={styles.rowsValue}>{productData ? productData.CODPROD : ''}</Text>
        </View>

        <View style={styles.obsRows}>
          <Text style={styles.rowsTitle}>Nome:</Text>
          <Text style={styles.rowsValue}>{productData ? productData.NOMPROD : ''}</Text>
        </View>

        <View style={styles.obsRows}>
          <Text style={styles.rowsTitle}>Preço:</Text>
          <Text style={styles.rowsValue}>{productData ? productData.preco : ''}</Text>
        </View>

        <View style={styles.obsRows}>
          <Text style={styles.rowsTitle}>Qtd atual:</Text>
          <Text style={styles.rowsValue}>{productData ? `${productData.SALDATUA} ${productData.UNUNIT}` : ''}</Text>
        </View>
      </View>

      {
        productData ?
          <>
            <View style={{ marginTop: 50 }}>
              <Text style={styles.qtdText}>
                Nova Quantidade
              </Text>

              <View style={styles.viewQtd}>
                <TouchableOpacity style={styles.btnMinusPlus} onPress={() => setNewQtd(newQtd - 1)}>
                  <Icon name="minus" size={30} color="#FFF" />
                </TouchableOpacity>

                <TextInput
                  value={String(newQtd)}
                  keyboardType='numeric'
                  style={styles.inputQtd}
                  onChangeText={text => setNewQtd(Number(text))} />

                <TouchableOpacity style={styles.btnMinusPlus} onPress={() => setNewQtd(newQtd + 1)}>
                  <Icon name="plus" size={30} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.viewButtons}>
              <TouchableOpacity style={styles.btnLimpar} onPress={() => handleCancelEdit()}>
                <Text style={styles.btnLimparTxt}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnSalvar} onPress={() => setProductData('')}>
                <Text style={styles.btnSalvarTxt}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </>
          : ''
      }

    </View>
  )
}

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    height: 85,
    borderRadius: 15,
    backgroundColor: '#007FFF',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

  mainView: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  logout: {
    width: 30,
    height: 30,
    color: 'white',
    margin: 10
  },

  cameraView: {
    height: 150,
    width: 350,
    borderWidth: 2,
    borderColor: '#007FFF',
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    overflow: 'hidden'
  },

  obsView: {
    width: '100%',
    marginTop: 20
  },

  obsRows: {
    borderBottomWidth: 2,
    borderBottomColor: '#909090',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  rowsTitle: {
    color: '#909090',
    fontSize: 20,
    fontWeight: 'bold'
  },

  rowsValue: {
    color: '#007FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  viewButtons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40
  },

  viewQtd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  btnLimpar: {
    width: 130,
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#007FFF",
    margin: 10
  },

  btnSalvar: {
    backgroundColor: "#007FFF",
    width: 130,
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },

  btnMinusPlus: {
    backgroundColor: "#007FFF",
    width: 40,
    height: 40,
    borderRadius: 30,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },


  btnLimparTxt: {
    color: '#007FFF',
  },

  btnSalvarTxt: {
    color: '#FFF',
  },

  inputQtd: {
    backgroundColor: "#D9D9D9",
    width: 100,
    height: 50,
    borderRadius: 20,
    color: "#007FFF",
    paddingHorizontal: 10,
    fontSize: 20
  },

  qtdText: {
    color: '#007FFF',
    fontSize: 20,
    alignSelf: 'center'
  }
})

export default Main