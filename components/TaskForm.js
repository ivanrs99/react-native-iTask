import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { TextInput } from 'react-native-paper';
import firebase from '../database/firebase'
import { showMessage, hideMessage } from "react-native-flash-message";


const TaskForm = (props) => {
    const [text, onChangeText] = useState("")
    //const [date, setDate] = useState(new Date())
    const [date, setDate] = useState("")

    const createTask = () => {
        if(text == ""){
            showMessage({
                message: "ERROR",
                description: "Debes completar todos los campos",
                type: "danger",
            });
            setTimeout(() => { hideMessage() }, 1500)
        }else{
            firebase.firestore()
            .collection('tasks')
            .add({
                task: text,
                date: date,
                completed: false
            }).then(() => {
                console.log('Task added!');
                props.updateVisible(false)
            });
        }
    }

    return (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
            <TextInput
                outlineColor='#6200EE'
                mode='outlined'
                label='Tarea'
                onChangeText={onChangeText}
                value={text}
                placeholder="Escribe aquí"
                style={styles.input}
            />
            <TextInput
                outlineColor='#6200EE'
                mode='outlined'
                label='Fecha'
                onChangeText={setDate}
                value={date}
                placeholder="dd/mm/yy"
                style={styles.input}
            />
            <View style={styles.buttonGroup}>
                <TouchableHighlight style={{ margin: 10 }} onPress={createTask}>
                    <View style={styles.addButton}>
                        <Text style={{ color: 'white', fontSize: 35, marginBottom: 7 }}>+</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={{ margin: 10 }} onPress={() => props.updateVisible(false)}>
                    <View style={styles.addButton}>
                        <Text style={{ color: 'white', fontSize: 35, marginBottom: 7 }}>-</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: '#6200EE',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    input: {
        width: 250,
        height: 60,
        marginBottom:10
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

export default TaskForm;