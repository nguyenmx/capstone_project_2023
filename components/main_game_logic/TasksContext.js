import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, Modal, View, TouchableOpacity, Image, Text } from 'react-native';
import { useCurrency } from '../CurrencyContext';
import coin from '../../images/PetHouse/Portrait/coin.png';
import balloons from '../../images/balloons.gif';
import sparkles from '../../images/sparkles.gif';

export const TasksContext = createContext({
  friendshipLevel: 0,
  incrementFriendship: () => {}
});
export const useTasks = () => useContext(TasksContext);
export const withTasks = (WrappedComponent) => {
  return (props) => {
    const tasksContext = useTasks();
    return <WrappedComponent {...props} tasks={tasksContext} />;
  };
};

export const TasksProvider = ({ children }) => {
  const {earnCurrency} = useCurrency();
  const [completedTaskId, setCompletedTaskId] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [friendshipLevel, setFriendshipLevel] = useState(0); // Added state for friendship level

  const incrementFriendship = () => {
    if (friendshipLevel < 5) {
      setFriendshipLevel(friendshipLevel + 1);
    }
  };

  const initialTasks = [
    { id: 0, text: "You need to feed the pet boi", completed: false },
    { id: 1, text: "Play with the pet, otherwise what's the point of having this app", completed: false },
    { id: 2, text: "Go lose another game in Combat Mode hehe 😈", completed: false },
    { id: 3, text: "Get the most favorite food plssss", completed: false },
    { id: 4, text: "Turn off the lights boi ", completed: false },
    { id: 5, text: "Just chill bruh", completed: false },
    { id: 6, text: "We are computer scientists, of course, we made an app", completed: false }
  ];
  
 
  const [tasks, setTasks] = useState(initialTasks);
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const completeTask = (taskId) => {
    // Find the index of the task in the tasks array
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    // Check if it's the first task or the previous task has been completed
    if (taskIndex === 0 || (taskIndex > 0 && tasks[taskIndex - 1].completed)) {
      // Check if the task is already completed
      if (!tasks[taskIndex].completed) {
        setTasks(prevTasks => {
          return prevTasks.map(task =>
            task.id === taskId ? { ...task, completed: true } : task
          );
        });
        earnCurrency('coins');
        console.log("Task " + taskId + " has been completed!");
        setCompletedTaskId(taskId); // Set completed task ID
        setShowModel(true);
          incrementFriendship();
      }
    } else {
      console.log("You can only complete this task after the previous one is completed.");
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, completeTask, showModel,  friendshipLevel, incrementFriendship }}>
      {children}
      {showModel && (
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={() => setShowModel(false)}>
        <Image source={sparkles} style={styles.sparkles}/>
        <Image source={balloons} style={styles.balloons}/>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModel(false)}>
            </TouchableOpacity>
            <Image source={coin} style={styles.modalImage} />
            <Text style={styles.title}>MAKE IT RAIN!!</Text>
            <Text style={styles.description}>You have completed the task! 😎 that's amazing</Text>
          </View>
        </View>
        </TouchableOpacity>
      )}
    </TasksContext.Provider>
  );
};
  
const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFE7B8',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    borderColor: '#663A31',
    borderWidth: 10,
    width: 290,
    height: 360,
    position: 'relative', // Necessary for positioning close button
  },
  modalImage: {
    width: 90,
    height: 90,
  },
  closeButton: {
    position: 'absolute',
    top: -15,
    right: -15,
  },
  closeIcon: {
    width: 60,
    height: 60,
  },
  title: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 35,
    marginTop: 10,
  },
  description: {
    fontFamily: 'NiceTango-K7XYo',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 10,
  },
  confetti: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 999, // Ensure it overlays the modal content
  },
  balloons: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    width: 390,
    height: 390,
    zIndex: 300, // Ensure it overlays the modal content
  },
  sparkles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 999, // Ensure it overlays the modal content
  },
});

