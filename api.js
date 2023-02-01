import AsyncStorage from '@react-native-async-storage/async-storage';

const host = async () => {
  try {
    let ip = await AsyncStorage.getItem('@IP');

    return `http://${ip}:3092/app_service`

  } catch (error) {
    console.error(error)
  }
}

export default host