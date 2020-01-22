import React, { Component } from 'react';
import PropTypes from 'prop-types'
import api from '../../services/api'
import { View, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../components/Header'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles';
import OrganizationItem from './OrganizationItem'
import { colors } from '../../styles';

const TabIcon = ({ tintColor }) => <Icon name='building' size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
}

export default class Organizations extends Component {
  static navigationOptions = {
    tabBabIcon: TabIcon
  };

  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadOrganizations()
  }

  loadOrganizations = async () => {
    this.setState({ refreshing: true })

    const username = await AsyncStorage.getItem('@Githuber:username')
    const { data } = await api.get(`/users/${username}/orgs`)

    this.setState({ data, loading: false, refreshing: false })
  }

  renderListItem = ({ item }) => <OrganizationItem organization={item} />

  renderList = () => {
    const { data, refreshing } = this.state;

    // console.tron.log(data);

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadOrganizations}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        refreshing={refreshing}
      />
    )
  }

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle={"dark-content"} backgroundColor={colors.white} />
        <Header title="Organizações" />
        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    )
  }
}
