import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WaterDrop = ({ size = 50, color = '#4FC3F7' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.drop, { backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  drop: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    transform: [{ rotate: '45deg' }],
  },
});

export default WaterDrop;
