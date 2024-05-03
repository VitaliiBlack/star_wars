import {Pressable, Platform, StyleSheet, Text} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {VibrancyView} from '@react-native-community/blur';
import {Person} from '../types';
import {StarWarsStore} from '../store/StarWarsStore';

export interface PersonProps {
  person: Person;
  onPress?: () => void;
}

const color = Platform.select({
  ios: '#fff',
  android: '#000',
});
const PersonItem = observer((props: PersonProps) => {
  const {person} = props;

  const handleFavorite = () => {
    StarWarsStore.handleFavorite(person);
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        props.onPress && props.onPress();
      }}>
      {Platform.OS === 'ios' ? (
        <VibrancyView
          style={styles.absolute}
          blurType="light"
          blurAmount={3}
          reducedTransparencyFallbackColor="white"
        />
      ) : null}
      <Icon
        onPress={() => handleFavorite()}
        name={StarWarsStore.isInFavorites(person) ? 'heart' : 'heart-o'}
        size={32}
        color="white"
        style={styles.icon}
      />
      <Text style={styles.text}>{person.name}</Text>
      <Text style={styles.text}>{person.gender || person.species}</Text>
    </Pressable>
  );
});

export default PersonItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
      },
      android: {
        backgroundColor: 'lightgray',
      },
    }),
    padding: 10,
    margin: 10,
  },
  text: {
    color: color,
    fontSize: 20,
  },
  icon: {
    color: color,
    fontSize: 32,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10,
  },
});
