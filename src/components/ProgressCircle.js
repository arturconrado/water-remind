import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const ProgressCircle = ({ progress, onAddWater }) => {
  const size = 200;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Svg height={size} width={size} style={{ transform: [{ rotate: '-90deg' }] }}>
          <Circle
            stroke="#E0E0E0"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <Circle
            stroke="#4FC3F7"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </Svg>
        <View style={styles.centerContent}>
          <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
          <Text style={styles.label}>Meta Diária</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.addButton} onPress={onAddWater}>
        <Text style={styles.addButtonText}>+ Beber Água</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  circleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0288D1',
  },
  label: {
    fontSize: 14,
    color: '#757575',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#4FC3F7',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProgressCircle;
