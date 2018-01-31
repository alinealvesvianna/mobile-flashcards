import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { StackNavigator, TabNavigator } from 'react-navigation'
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity
} from 'react-native'
import { setLocalNotification } from './utils/notifications'
import DeckContainer from './containers/DeckContainer'
import DeckListContainer from './containers/DeckListContainer'
import NewDeckContainer from './containers/NewDeckContainer'
import NewQuestionContainer from './containers/NewQuestionContainer'
import QuizContainer from './containers/QuizContainer'
import { Constants } from 'expo'

const store = configureStore()

function DeckStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckListContainer,
      navigationOptions: {
        tabBarLabel: 'Home'
      }
    },
    NewDeck: {
      screen: NewDeckContainer,
      navigationOptions: {
        tabBarLabel: 'Criar Baralho'
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      labelStyle: {
        fontSize: 15
      },
      activeTintColor: '#fff',
      inactiveTintColor: 'yellow',
      style: {
        height: 50,
        backgroundColor: '#000'
      }
    }
  }
)

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckContainer: {
    screen: DeckContainer,
    navigationOptions: ({ navigation }) => ({
      title: 'Deck'
    })
  },
  NewDeck: {
    screen: NewDeckContainer,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#000'
      }
    }
  },
  NewQuestion: {
    screen: NewQuestionContainer,
    navigationOptions: ({ navigation }) => ({
      title: 'Nova pergunta'
    })
  },
  Quiz: {
    screen: QuizContainer,
    navigationOptions: ({ navigation }) => ({
      title: 'Quiz'
    })
  }
})

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <DeckStatusBar backgroundColor="#000" barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
    height: 50,
    width: '80%',
    padding: 0,
    paddingBottom: 20,
    alignItems: 'flex-start',
    alignContent: 'flex-start'
  }
})
