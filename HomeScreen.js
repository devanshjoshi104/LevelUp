import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Text, Modal, TextInput } from 'react-native';
import Card from './Card';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage'


const HomeScreen = ({ navigation }) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [newCardText, setNewCardText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);

   useEffect(() => {
    loadLevels();
  }, []);

  const handleBackgroundPress = () => {
    if (deleteMode) {
      setDeleteMode(false);
    }
  };

  const deleteCard = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    saveLevels(updatedData);
  };

  const addCard = () => {
    if (newCardText.trim() !== '') {
      const newCard = { id: Date.now(), name: newCardText };
      saveLevels([...data, newCard]);
      setNewCardText('');
      setIsModalVisible(false);
    }
  };

   const loadLevels = async () => {
    try {
      const storedLevels = await AsyncStorage.getItem('levels_list');
      if (storedLevels) {
        setData(JSON.parse(storedLevels));
      } else {
        const defaultLevels = [
            { id: 1, name: 'Programming' },
            { id: 2, name: 'Meditation' },
            { id: 3, name: 'Cardio' },
            { id: 4, name: 'Stock Market' },
            { id: 5, name: 'Communication' },
            { id: 6, name: 'DSA' },
            { id: 7, name: 'System Design' },
            { id: 8, name: 'Startup' },
            { id: 9, name: 'Wisdom' },
            { id: 10, name: 'Muscles' }
  
        ];
        setData(defaultLevels);
        await AsyncStorage.setItem('levels_list', JSON.stringify(defaultLevels));
      }
    } catch (error) {
      console.error('Error loading levels:', error);
    }
  };

  const saveLevels = async (updatedLevels) => {
    try {
      setData(updatedLevels);
      await AsyncStorage.setItem('levels_list', JSON.stringify(updatedLevels));
    } catch (error) {
      console.error('Error saving levels:', error);
    }
  };


  return (
    <TouchableWithoutFeedback onPress={handleBackgroundPress}>
      <ScrollView>
        <View style={styles.appContainer}>
          <View style={styles.container}>
            {data.map((item) => (
              <TouchableOpacity
              >
                <Card id={item.id} 
                name={item.name} 
                handleBackgroundPress={handleBackgroundPress} 
                setDeleteMode={setDeleteMode} 
                deleteMode={deleteMode}/>
                {deleteMode && (
                <TouchableOpacity style={styles.deleteIcon} onPress={() => deleteCard(item.id)}>
                  <Text>❌</Text>
                </TouchableOpacity>
              )}
              </TouchableOpacity>
            ))}
             {deleteMode && (
            <TouchableOpacity style={styles.addCard} onPress={() => setIsModalVisible(true)}>
              <Text style={styles.addCardText}>+</Text>
            </TouchableOpacity>
          )}
          </View>
         
          <View style={styles.modelbutton}>
            <Button title="Models" onPress={() => {handleBackgroundPress(); navigation.navigate('Models')}} color="#11f2ad" />
          </View>
        </View>

        {/* Add Card Modal with Blur Effect */}
        <Modal visible={isModalVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
            <BlurView intensity={80} style={styles.blurBackground}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Enter Model Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Type here..."
                    placeholderTextColor="#ddd"
                    value={newCardText}
                    onChangeText={setNewCardText}
                  />
                  <TouchableOpacity style={styles.addButton} onPress={addCard}>
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </BlurView>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>

      
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#060c21',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  cardWrapper: {
    position: 'relative',
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
  modelbutton: {
    fontSize: 14,
    marginBottom: 8,
  },
  addCardText: {
    color: '#aacfff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  addCard: {
    width: 150,
    height: 130,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderColor: '#234b69',
    borderWidth: 1,
    borderStyle: 'dashed',
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
   blurBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#1b2838',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    color: '#caedff',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#234b69',
    borderWidth: 1,
    borderRadius: 5,
    color: '#ffffff',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#11f2ad',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default HomeScreen;
