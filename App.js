import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [idsearch, setIdsearch] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const getUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getUserById = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const json = await response.json();
      setData(json);
      // Chequear si se encuentra el id

      if (json.name != null) {
        setName(json.name); // Actualizar el estado name
        setUsername(json.username) // Actualizar el estado username
      }
      else {
        alert('Id NO encontrado')
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // getUsers(); // Al cargar el componente por primera vez 
  }, []);

  return (
    <View style={{ flex: 1, padding: 24, alignItems: "center" }}>

      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: "aqua", marginBottom: 50, width: 300 }]}
        onPress={getUsers}
      >
        <Text style={{ fontSize: 22 }}>Listado de Usuarios</Text>
      </TouchableOpacity>

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>SEARCH USER</Text>
        <TextInput
          style={[styles.inputs, { marginBottom: 30 }]}
          placeholder="Search by Id"
          onChangeText={idsearch => setIdsearch(idsearch)}
          value={idsearch}
        />
        <TextInput
          style={styles.inputs}
          value={name}
        />
        <TextInput
          style={styles.inputs}
          value={username}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: "green", marginBottom: 50, width: 300 }]}
        onPress={() => getUserById(idsearch)}
      >
        <Text style={{ fontSize: 22 }}>Search</Text>
      </TouchableOpacity>

      {isLoading ? <ActivityIndicator size="large" color="#000" /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.buttons, { backgroundColor: "green" }]}
              onPress={() => {
                alert(item.email)
              }}>
              <Text style={{ color: "white" }}>{item.name}, {item.username}</Text>
            </TouchableOpacity>

          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    borderRadius: 5,
    padding: 2,
    margin: 3,
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },

  inputs: {
    borderBottomColor: "black",
    borderColor: "white",
    textAlign: "center",
    borderWidth: 1,
    height: 30,
    width: 300
  }
});
