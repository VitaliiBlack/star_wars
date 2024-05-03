import {StyleSheet, View} from 'react-native';
import React from 'react';
import {StarWarsStore} from '../store/StarWarsStore';
import PersonsList from '../components/PeoplesList';
import Button from '../components/Button';
import {observer} from 'mobx-react';
import {PeoplesPageProps} from '../types';
import Pagination from '../components/Pagination';

const PeoplesPage: React.FC<PeoplesPageProps> = ({navigation}) => {
  const females = StarWarsStore.femaleFavorite;
  const males = StarWarsStore.maleFavorite;
  const others = StarWarsStore.otherFavorite;
  const allPeople = StarWarsStore.allPeopleCount;

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title1={`Mails ${males.length || 0} `}
          title2="press to refresh"
          onPress={() => {
            StarWarsStore.resetMales();
          }}
        />
        <Button
          title1={`Female ${females.length || 0} `}
          title2="press to refresh"
          onPress={() => {
            StarWarsStore.resetFemales();
          }}
        />
        <Button
          title1={`Other ${others.length || 0} `}
          title2="press to refresh"
          onPress={() => {
            StarWarsStore.resetOthers();
          }}
        />
      </View>
      <PersonsList navigation={navigation} />
      <Pagination totalItems={allPeople} itemsPerPage={10} />
    </View>
  );
};

export default observer(PeoplesPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
  },
  buttonContainer: {
    flex: 0,
    backgroundColor: 'transparent',
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backgroundAnimation: {
    position: 'absolute',
    width: '140%',
    height: '140%',
    left: -20,
    right: 0,
    top: -60,
    bottom: 0,
  },
});
