import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useCheckout } from '../src/useHooks/usePurchases.jsx';
import { useTheme } from '../ThemeContext';

export function Checkout({ reservationID, onClose }) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [name, setName] = useState('');
  const [correo, setCorreo] = useState('');

  const { checkout, loading } = useCheckout();

  // Datos seguros
  const _id = reservationID?.reservation_id || 'Cargando...';
  const precio = reservationID?.total_price || 0;
  console.log('EL ID |' + _id + '|');
  // Formato de dinero chileno
  const precioFormateado = precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  const idReal = reservationID?.reservation_id || reservationID?._id;

  // 1. IMPRIME EL LARGO (Esto no miente)
  // Un ObjectId de Mongo estándar tiene 24 caracteres hexadecimales.
  console.log(`Largo del ID: ${idReal.length}`);
  console.log(`El ID es: >${idReal}<`); // Las flechas > < te mostrarán si hay espacios

  // 2. PRUEBA DE FUEGO
  if (idReal.length !== 24) {
    console.error('¡ALERTA! El ID tiene basura. Debería medir 24.');
  }
  const handlePagar = async () => {
    if (!name || !correo) return Alert.alert('Faltan datos', 'Completa nombre y correo');

    try {
      // Tu lógica de pago
      await checkout({ reservation_id: _id, buyer: { name, email: correo } });
      Alert.alert('¡Éxito!', 'Compra confirmada');
      if (onClose) onClose();
    } catch (e) {
      // El hook ya maneja el error, pero por si acaso
    }
  };

  const salir = () => {
    setIsModalVisible(false);
  };
  return (
    <View style={styles.container}>
      {/* CABECERA */}
      <Text style={styles.title}>Confirmar Pago</Text>

      {/* RESUMEN (Tarjeta gris) */}
      <View style={styles.summaryCard}>
        <View style={styles.row}>
          <Text style={styles.labelSummary}>Total a pagar:</Text>
          <Text style={styles.priceText}>{precioFormateado}</Text>
        </View>
        <Text style={styles.idText}>ID Reserva: {_id}</Text>
      </View>

      {/* FORMULARIO */}
      <View style={styles.form}>
        <View>
          <Text style={styles.labelInput}>Nombre Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Juan Pérez"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View>
          <Text style={styles.labelInput}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: juan@email.com"
            placeholderTextColor="#999"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* BOTONES */}
      <View style={styles.footer}>
        <Pressable style={styles.btnPay} onPress={handlePagar} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.txtPay}>Pagar Ahora</Text>
          )}
        </Pressable>

        <Pressable style={styles.btnCancel} onPress={onClose}>
          <Text style={styles.txtCancel}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: theme === 'light' ? '#000' : '#fff',
    },
    summaryCard: {
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#333',
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: theme === 'light' ? '#e0e0e0' : '#444',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    labelSummary: { fontSize: 16, color: theme === 'light' ? '#555' : '#ccc' },
    priceText: { fontSize: 20, fontWeight: 'bold', color: theme === 'light' ? '#000' : '#fff' },
    idText: { fontSize: 12, color: '#888', textAlign: 'right' },

    form: { gap: 15, marginBottom: 20 },
    labelInput: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 6,
      color: theme === 'light' ? '#000' : '#fff',
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: theme === 'light' ? '#ccc' : '#555',
      borderRadius: 8,
      paddingHorizontal: 15,
      fontSize: 16,
      color: theme === 'light' ? '#000' : '#fff',
      backgroundColor: theme === 'light' ? '#fff' : '#222',
    },

    footer: { gap: 10 },
    btnPay: {
      backgroundColor: theme === 'light' ? '#000' : '#fff',
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtPay: {
      color: theme === 'light' ? '#fff' : '#000',
      fontWeight: 'bold',
      fontSize: 16,
    },
    btnCancel: {
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtCancel: {
      color: 'red',
      fontSize: 16,
      fontWeight: '500',
    },
  });
