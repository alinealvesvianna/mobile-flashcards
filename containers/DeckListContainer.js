import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { getDecksInfo } from '../utils/api'
import { getDecks } from '../actions/deck-actions'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

class DeckListContainer extends Component {
  state = {
    isLoading: true
  }

  renderItem = ({ item }) => {
    return (
      <View key={item.title}>
        <TouchableOpacity
          style={styles.deckItem}
          onPress={() =>
            this.props.navigation.navigate('DeckContainer', {
              deckTitle: item.title,
              deckNumberQuestions: item.questions
            })
          }
        >
          <Text style={styles.deckItemTitle}>{item.title}</Text>
          <Text style={styles.deckItemText}>{item.questions.length} cards</Text>
        </TouchableOpacity>
      </View>
    )
  }

  componentDidMount() {
    getDecksInfo()
      .then(data => this.props.getDecks(data))
      .then(this.setState({ isLoading: false }))
  }

  render() {
    const { isLoading } = this.state
    const { allDecks } = this.props
    return (
      <View>
        {isLoading && <AppLoading />}
        {allDecks && (
          <View>
            <FlatList
              data={allDecks}
              renderItem={({ item }) => this.renderItem({ item })}
            />
          </View>
        )}
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    allDecks: state.deckInfo.allDecks
  }
}

export default connect(mapStateToProps, {
  getDecks
})(DeckListContainer)

const styles = StyleSheet.create({
  deckItem: {
    width: '100%',
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 40,
  },
  deckItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deckItemText: {
    color: '#757575',
  },
})
