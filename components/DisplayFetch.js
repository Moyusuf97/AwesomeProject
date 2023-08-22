import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, Button, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Addnew from './Addnew';
import { Knapp } from './Knapp';
import DetailsScreen from './DetailsScreen';
import { useIsFocused } from '@react-navigation/native';

export default function DisplayFetch({ itemStyle, navigation }) {
  const [clothe, setClothe] = useState([]);
  const fetch2 = 'http://192.168.1.180:3000/clothe';
  const IsFocused = useIsFocused();

  const getAllClothe = () => {
    fetch(fetch2)
      .then(response => response.json())
      .then(clothe => setClothe(clothe))
      .catch(error => console.error('Error fetching data:', error));
  }

  useEffect(() => {
    getAllClothe();
  }, [IsFocused]);

  const handleDeleteItem = async (_id) => {
    try {
      const response = await fetch(fetch2 + '/' + `${_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Item deleted successfully');
        const updatedClothe = clothe.filter(item => item._id !== _id);
        setClothe(updatedClothe);
      } else {
        console.error(response.status);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleAddNewItem = async (newItem) => {
    try {
      const response = await fetch(fetch2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        setClothe([...clothe, newItem]);
      } else {
        console.error('Error adding new clothe:', response.status);
      }
    } catch (error) {
      console.error('Error adding new clothe:', error);
    }
  };

  const styles = {
    item: {
      backgroundColor: 'lightgray',
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView>
          {clothe.map(item => (
            <View key={item._id} style={[styles.item, itemStyle]}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>Price: ${item.price}</Text>
              <Text>Brand: {item.brand}</Text>
              <Text>Type: {item.type}</Text>
              <Knapp
                title="delete"
                _id={item._id}
                onDelete={handleDeleteItem}
              />
              <Button
                title="edit"
                onPress={() => navigation.navigate('DetailsScreen', { item })}
              />
            </View>
          ))}
        </ScrollView>

        <Addnew onAddItem={handleAddNewItem} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
