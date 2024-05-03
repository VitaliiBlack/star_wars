import {StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import PersonItem from './PersonItem';
import {StarWarsStore} from '../store/StarWarsStore';
import {observer} from 'mobx-react';

export interface PersonsListProps {
  navigation: any;
}

const PersonsList = (props: PersonsListProps) => {
  const persons = StarWarsStore.personList;
  useEffect(() => {
    StarWarsStore.loadPersons();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {persons &&
        persons.map(person => (
          <PersonItem
            key={person.name}
            person={person}
            onPress={() => {
              props.navigation.navigate('Person', {person});
            }}
          />
        ))}
    </ScrollView>
  );
};

export default observer(PersonsList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
