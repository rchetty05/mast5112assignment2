import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Image, FlatList, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const initialMenu = [
  {
    id: '1',
    title: 'Starters',
    price: 'R89',
    image: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Caesar+Salad', // Placeholder image
    description: 'Fresh romaine with Caesar dressing and croutons.',
  },
  {
    id: '2',
    title: 'Mains',
    price: 'R159',
    image: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Grilled+Salmon', // Placeholder image
    description: 'Grilled salmon fillet served with seasonal vegetables.',
  },
  {
    id: '3',
    title: 'Desserts',
    price: 'R69',
    image: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Chocolate+Cake', // Placeholder image
    description: 'Rich chocolate cake topped with whipped cream.',
  },
];

const HomeScreen = ({ navigation }) => {
  const [menu, setMenu] = useState(initialMenu);

  const editMenu = (id) => {
    const item = menu.find(m => m.id === id);
    if (item) {
      navigation.navigate('EditMenu', { item, setMenu });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Three Course Meals</Text>
      <FlatList
        data={menu}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Button title="View Details" onPress={() => navigation.navigate('Detail', { item })} />
            <Button title="Edit" onPress={() => editMenu(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const DetailScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={{ uri: item.image }} style={styles.detailImage} />
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const EditMenuScreen = ({ route, navigation }) => {
  const { item, setMenu } = route.params;
  const [title, setTitle] = useState(item.title);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);

  const handleSave = () => {
    const updatedMenu = { ...item, title, price, description };
    setMenu(prevMenu => prevMenu.map(m => (m.id === item.id ? updatedMenu : m)));
    Alert.alert('Menu updated!', 'The menu item has been successfully updated.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Menu Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Price (Rands)"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Chrisoffel Menu" component={HomeScreen} options={{ headerStyle: { backgroundColor: '#FF5733' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ headerStyle: { backgroundColor: '#FF5733' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
        <Stack.Screen name="EditMenu" component={EditMenuScreen} options={{ headerStyle: { backgroundColor: '#FF5733' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FF5733',
  },
  card: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  detailImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#28a745',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default App;
