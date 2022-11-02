import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [idsearch, setIdsearch] = useState('');
  // const [name, setName] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  // const [username, setUsername] = useState('');

  // const getUsers = async () => {
  //   try {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/users');
  //     const json = await response.json();
  //     setData(json);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // const getUserById = async (id) => {
  //   try {
  //     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  //     const json = await response.json();
  //     setData(json);
  //     // Chequear si se encuentra el id

  //     if (json.name != null) {
  //       setName(json.name); // Actualizar el estado name
  //       setUsername(json.username) // Actualizar el estado username
  //     }
  //     else {
  //       alert('Id NO encontrado')
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const getClientes = async () => {
    try {
      const url = `http://172.16.59.144:3000/api/clientes`;
      const response = await axios.get(url);
      setData(response.data)

    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  };

  const getClientById = async (id) => {
    try {
      const url = `http://172.16.59.144:3000/api/clientes/${id}`;
      const response = await axios.get(url);
      //setData(response.data)
      setNombre(response.data.nombre);
      setApellidos(response.data.apellidos);
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  };

  const saveCliente = async () => {
    if (!nombre.trim() || !apellidos.trim()) {
      alert("Nombre y apellidos inválidos");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`http://172.16.59.144:3000/api/clientes`, {
        nombre,
        apellidos,
      });
      alert("Cliente agregado correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };

  const updateCliente = async (id) => {
    if (!nombre.trim() || !apellidos.trim()) {
      alert("Nombre y apellidos inválidos");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`http://172.16.59.144:3000/api/clientes/${id}`, {
        nombre,
        apellidos,
      });
      alert("Cliente actualizado correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };

  const deleteCliente = async (id) => {
    try {
      if (confirm("Está seguro de eliminar este cliente")){
        const response = await axios.delete(`http://172.16.59.144:3000/api/clientes/${id}`, {
        });
        alert("Cliente Eliminado exitosamente ...")
      }
      
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  };


  useEffect(() => {
    // getUsers(); // Al cargar el componente por primera vez 
  }, []);

  return (
    <View style={{ flex: 1, padding: 24, alignItems: "center", backgroundColor: "#BCBCBC" }}>

      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: "aqua", marginBottom: 50, width: 300 }]}
        onPress={getClientes}
      >
        <Text style={{ fontSize: 22 }}>Listado de Clientes</Text>
      </TouchableOpacity>

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>SEARCH CLIENT</Text>
        <TextInput
          style={[styles.inputs, { marginBottom: 30 }]}
          placeholder="Search by Id"
          onChangeText={idsearch => setIdsearch(idsearch)}
          value={idsearch}
        />
        <TextInput
          style={styles.inputs}
          value={nombre}
          onChangeText={nombre => setNombre(nombre)}
        />
        <TextInput
          style={styles.inputs}
          value={apellidos}
          onChangeText={apellidos => setApellidos(apellidos)}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: "#71BA31", marginBottom: 5, width: 200 }]}
        onPress={() => saveCliente()}
      >
        <Text style={{ fontSize: 22, color: "white" }}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: "#71BA31", marginBottom: 5, width: 200 }]}
        onPress={() => getClientById(idsearch)}
      >
        <Text style={{ fontSize: 22, color: "white" }}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: "#558CCF", marginBottom: 5, width: 200 }]}
        onPress={() => updateCliente(idsearch)}
      >
        <Text style={{ fontSize: 22, color: "white" }}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: "#D14842", marginBottom: 50, width: 200 }]}
        onPress={() => deleteCliente(idsearch)}
      >
        <Text style={{ fontSize: 22, color: "white" }}>Eliminar</Text>
      </TouchableOpacity>
      


      {isLoading ? <ActivityIndicator size="large" color="#000" /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.buttons, { backgroundColor: "green" }]}
              onPress={() => {
                alert(item.nombre)
              }}>
              <Text style={{ color: "white", width: 200, textAlign: "center" }}>{item.nombre}, {item.apellidos}</Text>
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
    justifyContent: "center",
  },

  inputs: {
    borderBottomColor: "black",
    borderColor: "white",
    textAlign: "center",
    borderTopColor: "#BCBCBC",
    borderLeftColor: "#BCBCBC",
    borderRightColor: "#BCBCBC",
    borderWidth: 1,
    height: 30,
    width: 300
  }
});
