import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { StackNavigator } from 'react-navigation'
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity
} from 'react-native'
import DeckContainer from './containers/DeckContainer'
import DeckListContainer from './containers/DeckListContainer'
import NewDeckContainer from './containers/NewDeckContainer'
import NewQuestionContainer from './containers/NewQuestionContainer'
import QuizContainer from './containers/QuizContainer'
import { Constants } from 'expo'

const store = configureStore()

function DeckStatusBar ({backgroundColor, ...props}) {
    return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
  }

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckListContainer,
    navigationOptions: ({ navigation }) => ({
      title: 'Home'
    })
  },
  DeckContainer: {
    screen: DeckContainer,
    navigationOptions: ({ navigation }) => ({
      title: 'Deck'
    })
  },
  NewDeck: {
    screen: NewDeckContainer,
    navigationOptions: ({ navigation }) => ({
      title: 'Novo Deck'
    })
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
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <DeckStatusBar backgroundColor="#f0f" barStyle="light-content" />
          <MainNavigator />
        </View>
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
