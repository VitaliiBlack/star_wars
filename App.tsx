import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import LottieView from 'lottie-react-native';
import {observer} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationStack} from './src/navigation/NavigationStack';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <LottieView
        source={require('./src/animation/background.json')}
        style={styles.backgroundAnimation}
        autoPlay
        loop
      />
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  backgroundAnimation: {
    position: 'absolute',
    width: '140%',
    height: '140%',
    left: -20,
    right: 0,
    top: -140,
    bottom: 0,
  },
  sectionTitle: {
    fontSize: 24,
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'white',
    shadowOpacity: 1,
    fontWeight: '600',
  },
  sectionDescription: {
    borderRadius: 25,
  },
  highlight: {
    fontWeight: '700',
  },
  scrollView: {
    backgroundColor: 'transparent',
    width: '100%',
  },
});

export default observer(App);
