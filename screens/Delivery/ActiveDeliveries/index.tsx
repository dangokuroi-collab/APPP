import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, ListItem, Button } from '@rneui/themed';
import api from '../../../services/api';

const ActiveDeliveries = () => {
  const [activeOrders, setActiveOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await api.get('/orders');
    setActiveOrders(response.data.filter((o: any) => o.status === 'PROCESSING' || o.status === 'SHIPPED'));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: number, status: string) => {
    await api.put(`/orders/${orderId}`, { status });
    fetchOrders();
  };

  return (
    <View style={styles.container}>
      <Text h4>My Active Deliveries</Text>
      <FlatList
        data={activeOrders}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Order #{item.id}</ListItem.Title>
              <ListItem.Subtitle>Status: {item.status}</ListItem.Subtitle>
            </ListItem.Content>
            {item.status === 'PROCESSING' && (
                <Button title="Ship" onPress={() => updateStatus(item.id, 'SHIPPED')} />
            )}
            {item.status === 'SHIPPED' && (
                <Button title="Deliver" onPress={() => updateStatus(item.id, 'DELIVERED')} />
            )}
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

export default ActiveDeliveries;
