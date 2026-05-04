import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdminDashboard from "../screens/Admin/Dashboard";
import ProductManagement from "../screens/Admin/ProductManagement";
import OrderManagement from "../screens/Admin/OrderManagement";
import Header from '../components/Header';

const Stack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{
          header: (props) => <Header {...props} isShowHeading title="Admin Dashboard" isShowBackIcon={false} />
        }}
      />
      <Stack.Screen
        name="ProductManagement"
        component={ProductManagement}
        options={{
          header: (props) => <Header {...props} isShowHeading title="Products" isShowBackIcon />
        }}
      />
      <Stack.Screen
        name="OrderManagement"
        component={OrderManagement}
        options={{
          header: (props) => <Header {...props} isShowHeading title="Orders" isShowBackIcon />
        }}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
