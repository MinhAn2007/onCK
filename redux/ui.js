// screens/UserListScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { fetchUsers, createUser, updateUser, deleteUser } from '../redux/thunks';

const UserListScreen = ({ users, dispatch }) => {
  const [newUserName, setNewUserName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreateUser = () => {
    if (newUserName.trim() !== '' || newPhone.trim() !== '') {
      const newUser = {
        id: Math.max(...users.map((user) => user.id), 0) + 1,
        name: newUserName,
        contacts: [
          {
            type: 'email',
            value: newUserName ? `${newUserName.toLowerCase()}@example.com` : '',
          },
          {
            type: 'phone',
            value: newPhone || '',
          },
        ],
      };

      dispatch(createUser(newUser));
      setNewUserName('');
      setNewPhone('');
    }
  };

  const handleUpdateUser = (userId) => {
    const updatedData = {
      name: newUserName,
      contacts: users.find((user) => user.id === userId).contacts.map((contact) => {
        if (contact.type === 'email') {
          return { ...contact, value: newEmail };
        } else if (contact.type === 'phone') {
          return { ...contact, value: newPhone };
        } else {
          return contact;
        }
      }),
    };
  
    dispatch(updateUser(userId, updatedData));
    setNewUserName('');
    setNewPhone('');
  };
  

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.name}</Text>
      {item.contacts?.map((contact) => (
        <Text key={contact.type}>
          {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}: {contact.value}
        </Text>
      ))}
      <TextInput
        style={styles.updateInput}
        placeholder="Updated Name"
        value={newUserName}
        onChangeText={(text) => setNewUserName(text)}
      />
      <TextInput
        style={styles.updateInput}
        placeholder="Updated Email"
        onChangeText={(text) => setNewEmail(text)}
      />
      <TextInput
        style={styles.updateInput}
        placeholder="Updated Phone"
        onChangeText={(text) => setNewPhone(text)}
      />
      <Button
        title="Update"
        onPress={() => handleUpdateUser(item.id)}
      />
      <Button
        title="Delete"
        onPress={() => handleDeleteUser(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderUserItem}
      />
      <TextInput
        style={styles.createInput}
        placeholder="Enter user name"
        value={newUserName}
        onChangeText={(text) => setNewUserName(text)}
      />
      <TextInput
        style={styles.createInput}
        placeholder="Enter phone number"
        value={newPhone}
        onChangeText={(text) => setNewPhone(text)}
      />
      <Button
        title="Create"
        onPress={handleCreateUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  userItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  updateInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
  },
  createInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
  },
});

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(UserListScreen);
