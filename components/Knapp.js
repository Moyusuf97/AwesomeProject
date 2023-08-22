import React from 'react'
import { StyleSheet, Text, Pressable} from 'react-native';

export const Knapp = ({title, _id, onDelete}) => {

  const onPressFunction = () => {
    if(onDelete) {
      onDelete(_id)
    }

  }
  return (
    <Pressable onPress={onPressFunction}>
     {<Text style={{ alignItems: 'center', color: 'red'}}>{title}</Text>}

      </Pressable>
  )
}
