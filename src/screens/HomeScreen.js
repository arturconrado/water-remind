import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import ProgressCircle from '../components/ProgressCircle';
import WaterDrop from '../components/WaterDrop';
import {
  getTodayWaterIntake,
  addWaterIntake,
  getProgress,
  getDailyGoal,
  resetWaterIntake,
} from '../utils/waterStorage';
import {
  scheduleWaterReminder,
  cancelAllReminders,
  sendImmediateNotification,
} from '../utils/notifications';

const WATER_AMOUNTS = [100, 200, 250, 300, 500];

const HomeScreen = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dailyGoal, setDailyGoalState] = useState(2000);
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const intake = await getTodayWaterIntake();
    const goal = await getDailyGoal();
    const prog = await getProgress();
    
    setWaterIntake(intake);
    setDailyGoalState(goal);
    setProgress(prog);
  };

  const handleAddWater = async (amount) => {
    const newIntake = await addWaterIntake(amount);
    if (newIntake !== -1) {
      setWaterIntake(newIntake);
      const newProgress = await getProgress();
      setProgress(newProgress);

      if (newProgress >= 1 && waterIntake < dailyGoal) {
        await sendImmediateNotification();
      }
    } else {
      Alert.alert('Erro', 'Não foi possível registrar o consumo de água.');
    }
  };

  const handleToggleReminders = async () => {
    if (remindersEnabled) {
      await cancelAllReminders();
      setRemindersEnabled(false);
      Alert.alert('Lembretes desativados');
    } else {
      const notificationId = await scheduleWaterReminder(9, 0);
      if (notificationId) {
        setRemindersEnabled(true);
        Alert.alert('Lembretes ativados', 'Você receberá um lembrete diário às 09:00');
      } else {
        Alert.alert('Erro', 'Não foi possível ativar os lembretes. Verifique as permissões.');
      }
    }
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Resetar Progresso',
      'Tem certeza que deseja resetar seu progresso de hoje?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Resetar',
          style: 'destructive',
          onPress: async () => {
            await resetWaterIntake();
            setWaterIntake(0);
            setProgress(0);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>💧 Water Reminder</Text>
        <Text style={styles.subtitle}>Mantenha-se hidratado!</Text>
      </View>

      <ProgressCircle progress={progress} onAddWater={() => handleAddWater(250)} />

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{waterIntake}ml</Text>
          <Text style={styles.statLabel}>Consumido Hoje</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{dailyGoal}ml</Text>
          <Text style={styles.statLabel}>Meta Diária</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{Math.round(progress * 100)}%</Text>
          <Text style={styles.statLabel}>Progresso</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adicionar Água</Text>
        <View style={styles.amountButtons}>
          {WATER_AMOUNTS.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={styles.amountButton}
              onPress={() => handleAddWater(amount)}
            >
              <Text style={styles.amountButtonText}>+{amount}ml</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações</Text>
        
        <TouchableOpacity
          style={[styles.settingButton, remindersEnabled && styles.settingButtonActive]}
          onPress={handleToggleReminders}
        >
          <View style={styles.settingRow}>
            <WaterDrop size={30} color={remindersEnabled ? '#4CAF50' : '#4FC3F7'} />
            <Text style={[styles.settingText, remindersEnabled && styles.settingTextActive]}>
              {remindersEnabled ? 'Lembretes Ativados' : 'Ativar Lembretes'}
            </Text>
          </View>
          <View style={[styles.toggle, remindersEnabled && styles.toggleActive]}>
            <View style={[styles.toggleKnob, remindersEnabled && styles.toggleKnobActive]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingButton}
          onPress={handleResetProgress}
        >
          <View style={styles.settingRow}>
            <WaterDrop size={30} color="#FF5722" />
            <Text style={styles.settingText}>Resetar Progresso</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Beber água regularmente melhora sua saúde e disposição! 💪
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0288D1',
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  statBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    minWidth: 100,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0288D1',
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0288D1',
    marginBottom: 15,
  },
  amountButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amountButton: {
    backgroundColor: '#4FC3F7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  amountButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingButtonActive: {
    backgroundColor: '#E8F5E9',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#424242',
    marginLeft: 10,
  },
  settingTextActive: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#BDBDBD',
    justifyContent: 'center',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#4CAF50',
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
  footer: {
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
});

export default HomeScreen;
