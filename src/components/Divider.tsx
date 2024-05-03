import React from 'react';
import {View, StyleSheet} from 'react-native';

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: '#C0C0C0',
  },
});

export default Divider;
