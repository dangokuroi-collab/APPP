import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, ListItem, Icon } from '@rneui/themed';
import api from '../../../services/api';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await api.get('/orders');
    setOrders(response.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text h4>All Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Order #{item.id}</ListItem.Title>
              <ListItem.Subtitle>Total: ${item.total} - Status: {item.status}</ListItem.Subtitle>
              <Text>Customer: {item.user?.name || item.user?.email}</Text>
            </ListItem.Content>
          </ListItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default OrderManagement;
