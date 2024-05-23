import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

const models = [
 { id: 1, name: 'Programming' },
     { id: 8, name: 'Startup' },
    { id: 9, name: 'Wisdom' },
    { id: 10, name: 'Mindset' },
    { id: 3, name: 'Goals' },
    { id: 2, name: 'Sprituality' },
    { id: 4, name: 'Stock Market' },
    { id: 5, name: 'Communication' },
    { id: 6, name: 'DSA' },
    { id: 7, name: 'System Design' }
    
];

const ModelsScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {models.map((model) => (
          <TouchableOpacity
            key={model.id}
            style={styles.card}
            onPress={() => navigation.navigate('ModelDetail', { modelId: model.name })}
          >
            <Text style={styles.name}>{model.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060c21',
   flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 40,
  },
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
  }
});

export default ModelsScreen;
