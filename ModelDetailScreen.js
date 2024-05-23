import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModelDetailScreen = ({ route }) => {
  const { modelId } = route.params;
  const [items, setItems] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem(`model_${modelId}_items`);
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Error loading items from storage:', error);
      }
    };

    loadItems();
  }, [modelId]);

  const saveItems = async (newItems) => {
    try {
      await AsyncStorage.setItem(`model_${modelId}_items`, JSON.stringify(newItems));
    } catch (error) {
      console.error('Error saving items to storage:', error);
    }
  };

  const addItem = () => {
    if (inputText.trim() !== '') {
      const newItems = [...items, { id: Date.now().toString(), text: inputText }];
      setItems(newItems);
      saveItems(newItems);
      setInputText('');
    }
  };

  const deleteItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    saveItems(newItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{modelId}</Text>
      <TextInput
        style={styles.input}
        placeholder="Add new "
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Add Item" onPress={addItem} color="#11f2ad" />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Text style={styles.deleteText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060c21',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#caedff',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#caedff',
    borderWidth: 1,
    marginBottom: 20,
    color: '#ffffff',
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#234b69',
    width: '100%',
  },
  itemText: {
    color: '#aacfff',
    flex: 1,
    width:'70%',
    marginRight: 10,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  deleteText: {
    color: '#ff4d4d',
    fontSize: 20,
  },
});

export default ModelDetailScreen;
