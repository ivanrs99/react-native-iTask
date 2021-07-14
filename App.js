import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import firebase from './database/firebase'
import TaskItem from './components/TaskItem'
import TaskForm from './components/TaskForm'
import FlashMessage from "react-native-flash-message";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    getTasks()
    setTimeout(() => { setLoaded(true) }, 850)
  }, [])

  const getTasks = () => {
    firebase.firestore().collection("tasks").onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.docs.forEach(doc => {
          list.push({
            id: doc.id,
            task: doc.data().task,
            date: doc.data().date,
            completed: doc.data().completed
          });
      });
      //list.sort((a,b) => (a.completed == b.completed) ? 0: a.completed? -1: 1)
      list.sort(x => !x.completed ? -1:1)
      setTasks(list)
    });
  }

  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <StatusBar hidden={true} />
      <Text style={styles.title}>iTask</Text>
      <View style={styles.separator}></View>
      {!isLoaded ?
        <View style={{ alignItems: 'center', justifyContent: 'center', height: 200 }}>
          <ActivityIndicator size="large" color="#6200EE" />
        </View>
        :
        <View>
          {isVisible ?
              <TaskForm updateVisible={setVisible}/>
            :
            <View>
              {tasks.length > 0 ?
                <FlatList
                  style={styles.list}
                  data={tasks}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => <TaskItem task={item} />}
                />
                :
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                  <Text>No tienes ninguna tarea</Text>
                  <TouchableHighlight style={{ margin: 10 }} onPress={() => setVisible(true)}>
                    <View style={styles.addButton}>
                      <Text style={{ color: 'white', fontSize: 35, marginBottom: 7 }}>+</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              }
            </View>
          }
        </View>
      }
      {tasks.length != 0 && !isVisible && isLoaded &&
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => setVisible(true)}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },

  addButton: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },

  title: {
    fontSize: 35,
    fontFamily: 'monospace',
    fontStyle: 'italic',
    marginBottom: 8
  },

  separator: {
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
    color: 'white'
  },

  list: {
    width: "100%",
    marginTop:10
  },
});

export default App;
