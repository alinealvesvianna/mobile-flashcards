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
                style={styles.deckTextArea}
                onPress={() => this.props.navigation.navigate(
                    'DeckContainer',
                    { deckTitle: item.title }
                  )}>
                <Text style={styles.deckTitle}>{item.title}</Text>
                <Text style={styles.deckCardsText}>{item.questions.length} cardsss</Text>
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
          {console.log(allDecks)}
            <FlatList
              data={allDecks}
              renderItem={({ item }) => this.renderItem({ item  })}
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
  decksListContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  deckTitle: {
    fontSize: 30,
    textAlign: 'center'
  },
  deckContainer: {
    flex: 1,
    width: '100%'
  },
  deck: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center'
  },
  deckTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  deckTextArea: {
    width: '100%',
    alignItems: 'center'
  },
  deckCardsText: {
    color: '#000'
  }
})
