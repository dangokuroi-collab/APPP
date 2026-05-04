import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const AdminDashboard = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text h1>Admin Panel</Text>
      <View style={styles.menu}>
        <Button
          title="Product Management"
          onPress={() => navigation.navigate('ProductManagement')}
          containerStyle={styles.button}
        />
        <Button
          title="Order Management"
          onPress={() => navigation.navigate('OrderManagement')}
          containerStyle={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  menu: {
    marginTop: 40,
  },
  button: {
    marginBottom: 20,
  },
});

export default AdminDashboard;
