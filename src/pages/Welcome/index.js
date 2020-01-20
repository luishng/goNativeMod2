import React, { Component } from 'react';
import api from '../../services/api'

import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import { colors } from '../../styles'

export default class Welcome extends Component {
  state = {
    username: '',
  }

  checkUserExists = async (username) => {
    const user = await api.get(`/users/${username}`);

    return user;
  }

  saveUser = async (username) => {
    await AsyncStorage.setItem('@Githuber:username', username);
  }

  signIn = async () => {
    const { username } = this.state;

    try {
      await this.checkUserExists(username)
      await this.saveUser(username)

    } catch (err) {
      console.log('usuario nao existe')
    }
  }

  render() {
    const { username } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} backgroundColor={colors.secundary} />
        <Text style={styles.title}>Testando</Text>
        <Text style={styles.text}>Para continuar informe seu usuário do github</Text>


        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu usuário"
            underlineColorAndroid="transparent"
            value={username}
            onChangeText={text => this.setState({ username: text })} />

          <TouchableOpacity style={styles.button} onPress={() => this.signIn}>
            <Text style={styles.buttonText}>Prosseguir</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
