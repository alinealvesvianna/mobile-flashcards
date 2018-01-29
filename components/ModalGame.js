import React from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View, Text, ActivityIndicator, Button, TouchableOpacity } from 'react-native'

const ModalGame = ({isVisible, errorMessage, onCloseClick, ...props}) => (
    <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <TouchableOpacity onPress={onCloseClick} style={{width: '50%'}}>
                <View style={styles.modalButton}>
                    <Text style={{color: '#fff', fontSize : 20}}>Fechar</Text>
                </View>
            </TouchableOpacity>
        </View>
    </Modal>
)

export default ModalGame

const styles = StyleSheet.create({
    modalContainer: {
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    modalMessage: {
        textAlign: 'center',
        fontSize: 24,
        color: '#000'
    },
    modalButton: {
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: '#000',
        margin: 16,
        padding: 8
    },
})