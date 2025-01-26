import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Card = ({ id, name, deleteMode, setDeleteMode, handleBackgroundPress }) => {
  const [count, setCount] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const getCountFromStorage = async () => {
      try {
        const storedCount = await AsyncStorage.getItem(`count_${name}`);
        if (storedCount !== null) {
          const parsedCount = parseInt(storedCount, 10);
          setCount(parsedCount);
          updateLevel(parsedCount);
        }
      } catch (error) {
        console.error('Error retrieving count from storage:', error);
      }
    };

    getCountFromStorage();
  }, [id]);

  const updateLevel = (newCount) => {
    let currentLevel = 1;
    let nextLevelLimit = 100;

    while (newCount >= nextLevelLimit) {
      currentLevel += 1;
      nextLevelLimit = 100 * Math.pow(2, currentLevel - 1);
    }

    setLevel(currentLevel);
  };

  const handlePress = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateLevel(newCount);

    // Store the updated count in local storage with a unique key for each card
    AsyncStorage.setItem(`count_${id}`, newCount.toString());
  };

  return (
    <TouchableOpacity 
    onPress={() => deleteMode ? handleBackgroundPress() : handlePress() }
                onLongPress={() => setDeleteMode(true)}>
      <View style={styles.card}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.level}>Level: {level}</Text>
        <Text style={styles.count}>( {count}/{100 * Math.pow(2, level - 1)} )</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 130,
    // aspectRatio: 1, // Maintain a square aspect ratio
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderColor: '#234b69',
    borderWidth: 1,
    elevation: 3, // Add elevation for a futuristic look
    position: 'relative',
    overflow: 'hidden', // Hide overflowing content
  },
  name: {
    color: '#aacfff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  count: {
    color: '#234b69',
    fontSize: 9,
    marginTop: 5,
  },
  level: {
    color: '#FFD700',
    fontSize: 14,
    marginTop: 5,
  },
});

export default Card;
