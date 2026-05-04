import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, ListItem, Button } from '@rneui/themed';
import api from '../../../services/api';

const DeliveryDashboard = () => {
  const [availableOrders, setAvailableOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await api.get('/orders');
    // Filter orders that are PENDING or already assigned to this delivery person (handled by backend but we filter for display)
    setAvailableOrders(response.data.filter((o: any) => o.status === 'PENDING'));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const takeOrder = async (orderId: number) => {
    await api.put(`/orders/${orderId}`, { status: 'PROCESSING' });
    fetchOrders();
  };

  return (
    <View style={styles.container}>
      <Text h4>Pending Deliveries</Text>
      <FlatList
        data={availableOrders}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Order #{item.id}</ListItem.Title>
              <ListItem.Subtitle>Total: ${item.total}</ListItem.Subtitle>
            </ListItem.Content>
            <Button title="Take" onPress={() => takeOrder(item.id)} />
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

export default DeliveryDashboard;
