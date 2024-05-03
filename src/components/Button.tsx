import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export interface ButtonProps {
  title1?: string | number;
  title2?: string | number;
  onPress: () => void;
}
const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <View style={styles.titleContainer}>
        {props.title1 && <Text style={styles.title1}>{props.title1}</Text>}
        {props.title2 && <Text style={styles.title2}>{props.title2}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    margin: 5,
    borderRadius: 10,
    minWidth: 100,
    height: 50,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title1: {
    color: '#000000',
    fontSize: 15,
  },
  title2: {
    color: '#000000',
    fontSize: 12,
  },
});
