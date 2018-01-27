import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { StackNavigator } from 'react-navigation'
import { View, StyleSheet, StatusBar, Text, TouchableOpacity } from 'react-native'

const store = configureStore()


const Home = ({ navigation }) => (
    <View>
      <Text>This is the Home view</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Text>Press here for the Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
  
  const Dashboard = () => (
    <View>
      <Text>Este é o Dashboard</Text>
    </View>
  );

const Stack = StackNavigator({
    Home: {
      screen: Home
    },
    Dashboard: {
      screen: Dashboard
    }
  })



export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})


