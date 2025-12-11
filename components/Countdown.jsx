import { Text, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';

export default function Countdown({ expiresAt, onFinish }) {
  const { theme } = useTheme();

  // Lógica: Si hay fecha del backend usamos esa, si no, usamos "Ahora + 2 minutos"
  const getTargetTime = () => {
    if (expiresAt) return new Date(expiresAt).getTime();
    return new Date().getTime() + 2 * 60 * 1000; // 2 minutos en milisegundos
  };

  const [timeLeft, setTimeLeft] = useState(getTargetTime() - new Date().getTime());

  useEffect(() => {
    const target = getTargetTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        if (onFinish) onFinish(); // Avisamos que terminó
      } else {
        setTimeLeft(difference);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]); // Se reinicia si cambia la fecha

  // Matemáticas simples para formato mm:ss
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  // Agregamos el "0" adelante si es menor a 10 (ej: 05)
  const strMin = minutes < 10 ? `0${minutes}` : minutes;
  const strSec = seconds < 10 ? `0${seconds}` : seconds;

  // Color de pánico: Rojo si falta menos de 30 segundos
  const isUrgent = timeLeft < 30000;
  const textColor = isUrgent ? '#ff5252' : theme === 'light' ? '#333' : '#fff';

  return (
    <View style={[styles.container, isUrgent && styles.urgentContainer]}>
      <MaterialIcons name="timer" size={20} color={isUrgent ? 'white' : textColor} />
      <Text style={[styles.timerText, { color: isUrgent ? 'white' : textColor }]}>
        {strMin}:{strSec}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    alignSelf: 'center',
    marginBottom: 10,
  },
  urgentContainer: {
    backgroundColor: '#ff5252',
    borderColor: '#ff5252',
    borderRadius: 20, // Más redondo cuando es urgente
    paddingHorizontal: 15,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'], // Para que los números no bailen
  },
});
