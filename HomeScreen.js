import React from 'react';
import { View, ScrollView, Text, StyleSheet, Button } from 'react-native';
import Card from './Card';

const HomeScreen = ({ navigation }) => {
  const data = [
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

  return (
   <ScrollView>
      <View style={styles.appContainer}>
  
        <View style={styles.container}>
          {data.map((item) => (
            <Card key={item.id} id={item.id} name={item.name} />
          ))}
        </View>
        <View style={styles.modelbutton}>
          <Button
            title="Models"
            onPress={() => navigation.navigate('Models')}
            color="#11f2ad"
          />
        </View>
      </View>
    </ScrollView>
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
    justifyContent: 'space-around'
  },
  modelbutton: {
    fontSize: 14,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#caedff',
    marginTop: 30,
    marginBottom: 60,
  },
});

export default HomeScreen;
