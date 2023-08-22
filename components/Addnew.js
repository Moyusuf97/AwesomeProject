import React, { useState } from 'react'
import { View , Text, StyleSheet, TextInput, Button } from 'react-native';




export default function Addnew({onAddItem}) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleAddItem = () => {
    if (title === '' || price === '' || brand === '' || type === '') {
      setErrorMessage('All fields are required');
      return;
      
    }


    const newItem = {
      id: new Date().getTime().toString(),
      title: title,
      price: parseFloat(price),
      brand: brand,
      type: type
    };

    onAddItem(newItem);
    setTitle('');
    setPrice('');
    setBrand('');
    setType('');
    setErrorMessage('')


  };

  const handlePriceChange = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    setPrice(numericValue);
  };
  
  return (
    <View style={styles.container}>
     <TextInput
      style={styles.input}
      placeholder = "Title"
      value = {title}
      onChangeText= {setTitle}
     />
      <TextInput
      style={styles.input}
      placeholder = "Price"
      value = {price.toString()}
      onChangeText= {handlePriceChange}
      keyboardType= 'numeric'
      returnKeyType='done'
     />
      <TextInput
      style={styles.input}
      placeholder = "Brand"
      value = {brand}
      onChangeText= {setBrand}
     />
      <TextInput
      style={styles.input}
      placeholder = "Type"
      value = {type}
      onChangeText= {setType}
     />

  {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}

     <Button title = "Add to stock" onPress={handleAddItem} ></Button>
    </View>
  )
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
