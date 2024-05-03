import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Person, PersonPageProps} from '../types';
import {observer} from 'mobx-react';
import Divider from '../components/Divider';
import {StarWarsStore} from '../store/StarWarsStore';

export interface PersonProps {
  person: Person;
}
const PersonPage: React.FC<PersonPageProps> = ({route}: any) => {
  const person = route.params.person as Person;
  const [homeworldName, setHomeworldName] = useState('');
  useEffect(() => {
    const fetchHomeworld = async () => {
      try {
        const name = await StarWarsStore.getHomeworld(person);
        setHomeworldName(name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHomeworld();
  }, [person]);
  return (
    <View style={styles.container}>
      <View style={styles.columnWrapper}>
        <Text style={styles.text}>Name</Text>
        <Text style={styles.text}>{person.name}</Text>
      </View>
      <Divider />
      <View style={styles.personInfo}>
        <View style={styles.columnWrapper}>
          <Text style={styles.text}>Birth Year</Text>
          <Text style={styles.text}>{person.birth_year}</Text>
        </View>
        <View style={styles.columnWrapper}>
          <Text style={styles.text}>Eye Color</Text>
          <Text style={styles.text}>{person.eye_color}</Text>
        </View>
        <View style={styles.columnWrapper}>
          <Text style={styles.text}>Skin Color</Text>
          <Text style={styles.text}>{person.skin_color}</Text>
        </View>
        <View style={styles.columnWrapper}>
          <Text style={styles.text}>Hair Color</Text>
          <Text style={styles.text}>{person.hair_color}</Text>
        </View>
        <View style={styles.columnWrapper}>
          <Text style={styles.text}>Home World</Text>
          <Text style={styles.text}>{homeworldName}</Text>
        </View>
        <View style={styles.columnWrapper}>
          <Text style={styles.text}>Gender</Text>
          <Text style={styles.text}>{person.gender}</Text>
        </View>
        <View style={styles.columnWrapper}>
          <Text style={styles.text}>Mass</Text>
          <Text style={styles.text}>{person.mass}</Text>
        </View>
      </View>
    </View>
  );
};

export default observer(PersonPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  columnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    backgroundColor: 'transparent',
  },
  personInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: 'transparent',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5,
  },
});
