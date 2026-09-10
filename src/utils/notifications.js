import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const requestNotificationPermissions = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Permissão de notificação não concedida');
      return false;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('water-reminder', {
        name: 'Lembrete de Água',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#4FC3F7',
      });
    }

    return true;
  } catch (error) {
    console.error('Erro ao solicitar permissão de notificação:', error);
    return false;
  }
};

export const scheduleWaterReminder = async (hour = 9, minute = 0) => {
  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      return null;
    }

    const trigger = {
      hour,
      minute,
      repeats: true,
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '💧 Hora de beber água!',
        body: 'Mantenha-se hidratado! Beba um copo de água agora.',
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger,
    });

    return notificationId;
  } catch (error) {
    console.error('Erro ao agendar lembrete:', error);
    return null;
  }
};

export const cancelAllReminders = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    return true;
  } catch (error) {
    console.error('Erro ao cancelar lembretes:', error);
    return false;
  }
};

export const sendImmediateNotification = async () => {
  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      return false;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🎉 Meta Atingida!',
        body: 'Parabéns! Você bebeu água suficiente hoje. Continue assim!',
        sound: true,
      },
      trigger: null,
    });

    return true;
  } catch (error) {
    console.error('Erro ao enviar notificação imediata:', error);
    return false;
  }
};
