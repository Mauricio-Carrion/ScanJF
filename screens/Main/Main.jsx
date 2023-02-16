import React, { useEffect, useState, Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView,
  Button,
  Dimensions,
  Modal
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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleOpenModal = (message) => {
    setModalVisible(true)
    setModalMessage(message)
  }

  const handleCloseModal = () => {
    setModalVisible(!modalVisible)
    setModalMessage('')
  }

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

    await axios.get(`${hostAdress}/produto/${code}`, { headers: headers })
      .then(res => setProductData(res.data))
      .catch(error => handleOpenModal(error.response.data.msg))
  }

  const putProduct = async () => {
    const hostAdress = await host()

    const headers = {
      'user': user,
      'password': password
    }

    const data = {
      empresa: productData.CODEMPR,
      codigo: productData.CODPROD,
      produto: productData.NOMPROD,
      saldo: newQtd,
      saldoAnterior: productData.SALDATUA
    }

    console.log(productData);
    console.log(productData.CODEMPR);

    await axios.put(`${hostAdress}/produto`, data, { headers: headers })
      .then(res => handleOpenModal("Saldo alterado!"))
      .catch(error => handleOpenModal(error.response.data.msg))

    handleCancelEdit()
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
      handleOpenModal(error)
    }
  }

  const handleCancelEdit = () => {
    setProductData(null)
    setNewQtd(0)
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <KeyboardAvoidingView
        behavior='position'
        style={styles.container}>
        <View style={{
          width: Dimensions.get('window').width,
          justifyContent: 'center',
          alignItems: 'center'
        }}>

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
              <Text style={styles.rowsValue}>{productData ? `R$ ${productData.PVUNIT}` : ''}</Text>
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

                  <TouchableOpacity style={styles.btnSalvar} onPress={() => putProduct()}>
                    <Text style={styles.btnSalvarTxt}>Salvar</Text>
                  </TouchableOpacity>
                </View>

              </>
              : ''
          }
        </View>
      </KeyboardAvoidingView >

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          handleCloseModal();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableHighlight
              underlayColor="#00A8E8"
              style={styles.buttonModal}
              onPress={() => handleCloseModal()}>
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  modalText: {
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 60,
    marginTop: 50,
    color: '#909090'
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonModal: {
    backgroundColor: '#007FFF',
    borderRadius: 20,
    width: 80,
    padding: 5,
    elevation: 2,
    margin: 10,
    position: 'absolute',
    bottom: 35
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#ffffff8f'
  },

  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: "85%",
    height: 200,
    alignItems: 'center',
    padding: 10,
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

  topBar: {
    width: "100%",
    height: 90,
    marginTop: -10,
    borderRadius: 15,
    backgroundColor: '#007FFF',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

  mainView: {
    flex: 1,
    height: '100%',
    justifyContent: 'center'
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
    alignSelf: 'center',
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
    overflow: 'hidden',
  },

  viewButtons: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 40
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