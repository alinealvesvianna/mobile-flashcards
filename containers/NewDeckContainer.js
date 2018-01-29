import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native'

import { newDeck } from '../actions/deck-actions'
import { postTitleDeck } from '../utils/api'
import { connect } from 'react-redux'
import ModalGame from '../components/ModalGame'

class NewDeckContainer extends Component {
  state = {
    title: '',
    isVisibleModal: false
  }

  onPress = () => {
    const { allDecks } = this.props
    const { title } = this.state

    let newDeck = { title: title, questions: [] }

    if (title !== '') {
      postTitleDeck(title)
      .then((data) => {
        this.props.newDeck(newDeck)

        this.setState({ title: '' })
        this.props.navigation.navigate('DeckContainer', { 
            deckTitle: title,
            deckNumberQuestions: [],
        })
      })
    } else {
      this.setState({
        visibleModal: true
      })
    }
  }
  render() {
    const navigation = this.props.navigation
    const { isVisibleModal, title } = this.state
    return (
      <View style={styles.container}>
        <ModalGame
          isVisible={isVisibleModal}
          errorMessage={'A resposta não pode ser vazia!'}
          onCloseClick={() => this.setState({ isVisibleModal: false })}
        />
        <View style={styles.formContainer}>
          <View style={styles.formContainerTitleBox}>
            <Text style={styles.formContainerTitle}>
              Qual é o titulo do seu novo baralho?
            </Text>
          </View>
          <View style={styles.formContainerInputBox}>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 10
              }}
              placeholder="Título do baralho"
              onChangeText={title => this.setState({ title })}
              value={title}
            />
          </View>
          <View style={styles.formContainerButton}>
            <Button onPress={this.onPress} title="Submit" color="#fff" />
          </View>
        </View>
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
    newDeck
})(NewDeckContainer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%'
  },
  formContainerTitleBox: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 30
  },
  formContainerTitle: {
    fontSize: 40,
    textAlign: 'center'
  },
  formContainerInputBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingLeft: 3,
    paddingRight: 3,
    marginBottom: 30
  },
  formContainerInput: {
    marginTop: 8,
    marginBottom: 5
  },
  formContainerButton: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15
  }
})
