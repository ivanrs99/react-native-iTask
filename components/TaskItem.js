import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Checkbox } from 'react-native-paper';
import firebase from '../database/firebase'

const TaskItem = ({ task }) => {
    const [isSelected, setSelection] = useState(false);

    useEffect(() => {
        setSelection(task.completed)
    }, [])

    const update = () => {
        task.completed = !task.completed;
        firebase.firestore().collection('tasks').doc(task.id).update({
            completed: task.completed,
        }).then(() => {
            console.log('Task updated!');
        });
    }

    return (
        <View style={styles.containerItem}>
            <View style={styles.taskCheck}>
                <Checkbox
                    status={isSelected ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setSelection(!isSelected)
                        update();
                    }}
                    color='#6200EE'
                />
            </View>
            <View style={{ marginTop: 8 }}>
                {isSelected ?
                    <Text id={task.id} style={styles.textLine}>{task.task}</Text>
                    :
                    <Text id={task.id} style={{color:"black"}}>{task.task}</Text>
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    containerItem: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 5
    },
    taskCheck: {
        flexDirection: "row",

    },
    textLine: {
        textDecorationLine: 'line-through',
        color: "gray"
    }
});

export default TaskItem;