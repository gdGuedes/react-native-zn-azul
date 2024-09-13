import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Picker,
} from 'react-native';
import moment from 'moment';

const App = () => {
  const [placa, setPlaca] = useState('');
  const [tipo, setTipo] = useState('');
  const [carroEletrico, setCarroEletrico] = useState(false);
  const [horaEntrada, setHoraEntrada] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const [valor, setValor] = useState(null);

  const calcularValor = () => {
    if (!horaEntrada || !horaSaida) {
      alert('Por favor, preencha as horas de entrada e saída.');
      return;
    }

    const entrada = moment(horaEntrada, 'HH:mm');
    const saida = moment(horaSaida, 'HH:mm');

    if (saida.isBefore(entrada)) {
      alert('A hora de saída deve ser após a hora de entrada.');
      return;
    }

    const duracaoHoras = saida.diff(entrada, 'hours', true);
    const duracao = Math.ceil(duracaoHoras);

    let valorBase;

    switch (tipo) {
      case 'Sub-compacto':
        valorBase = 2.0;
        break;
      case 'Compacto':
        valorBase = 3.0;
        break;
      case 'Hatch/SUV/Sedan':
        valorBase = 5.0;
        break;
      case 'Pickup':
        valorBase = 7.0;
        break;
      default:
        valorBase = 0;
        break;
    }

    if (carroEletrico) {
      valorBase *= 0.5;
    }

    const valorTotal = valorBase * duracao;

    setValor(valorTotal.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo de Estacionamento</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite a placa do veículo"
        value={placa}
        onChangeText={setPlaca}
      />

      <Picker
        selectedValue={tipo}
        style={styles.picker}
        onValueChange={(itemValue) => setTipo(itemValue)}>
        <Picker.Item label="Selecione o tipo de veículo" value="" />
        <Picker.Item label="Sub-compacto" value="Sub-compacto" />
        <Picker.Item label="Compacto" value="Compacto" />
        <Picker.Item label="Hatch/SUV/Sedan" value="Hatch/SUV/Sedan" />
        <Picker.Item label="Pickup" value="Pickup" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Hora de entrada (Horas : Minutos)"
        value={horaEntrada}
        onChangeText={setHoraEntrada}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Hora de saída (Horas : Minutos)"
        value={horaSaida}
        onChangeText={setHoraSaida}
        keyboardType="numeric"
      />

      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>Carro Elétrico</Text>
        <TouchableOpacity
          style={[styles.button, carroEletrico && styles.selectedButton]}
          onPress={() => setCarroEletrico(!carroEletrico)}>
          <Text style={styles.buttonText}>{carroEletrico ? 'Sim' : 'Não'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.calculateButton} onPress={calcularValor}>
        <Text style={styles.calculateButtonText}>Calcular Valor</Text>
      </TouchableOpacity>

      {valor !== null && (
        <Text style={styles.result}>Valor total a ser pago: R$ {valor}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 16,
    marginRight: 12,
    color: '#333',
  },
  button: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    border: '1px solid #ccc',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#4caf50',
    border: 'none',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  calculateButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculateButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default App;
