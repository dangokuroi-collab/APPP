import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, ListItem, Button, Icon } from '@rneui/themed';
import api from '../../../services/api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await api.get('/products');
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text h4>Manage Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>${item.price}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon name="delete" color="red" onPress={async () => {
                await api.delete(`/products/${item.id}`);
                fetchProducts();
            }} />
          </ListItem>
        )}
      />
      <Button title="Add Product" containerStyle={styles.addBtn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addBtn: {
    marginTop: 10,
  }
});

export default ProductManagement;
