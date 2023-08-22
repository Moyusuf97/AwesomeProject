import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const [editedItem, setEditedItem] = useState(item);

  const fetch2 = `http://192.168.1.180:3000/clothe/${editedItem._id}`;


  const handleUpdate = async () => {
    const updateData = {
      title: editedItem.title,
      price: editedItem.price,
      brand: editedItem.brand,
      type: editedItem.type,
    };
  
    try {
      const response = await fetch(fetch2, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
  
      if (response.ok) {
        navigation.goBack();
        
      } else {
        console.error('Error updating clothe:', response.status);
      }
    } catch (error) {
      console.error('Error updating clothe:', error);
    }
  };
  
  
  return (
    <View>
      <TextInput
      style={styles.input}
        value={editedItem.title}
        onChangeText={(text) => setEditedItem({ ...editedItem, title: text })}
      />
      <TextInput
      style= {styles.input}
        value={editedItem.price.toString()}
        onChangeText={(text) =>
          setEditedItem({ ...editedItem, price: parseFloat(text) })
        }
        keyboardType="numeric"
      />
      <TextInput
      style= {styles.input}
      value={editedItem.brand}
      onChangeText={(text) => setEditedItem({ ...editedItem, brand: text })}
      />
      <TextInput
      style= {styles.input}
        value={editedItem.type}
        onChangeText={(text) => setEditedItem({ ...editedItem, type: text })}
      />
      
      <Button title="Update" onPress={handleUpdate}/>
     
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 12,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
});


export default DetailsScreen;
