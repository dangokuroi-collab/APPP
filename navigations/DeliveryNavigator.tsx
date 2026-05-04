import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeliveryDashboard from "../screens/Delivery/Dashboard";
import ActiveDeliveries from "../screens/Delivery/ActiveDeliveries";
import Header from '../components/Header';
import { Icon } from "@rneui/themed";

const Tab = createBottomTabNavigator();

const DeliveryNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Available"
        component={DeliveryDashboard}
        options={{
          header: (props) => <Header {...props} isShowHeading title="Available Orders" isShowBackIcon={false} />,
          tabBarIcon: ({ color }) => <Icon name="list" color={color} />
        }}
      />
      <Tab.Screen
        name="Active"
        component={ActiveDeliveries}
        options={{
          header: (props) => <Header {...props} isShowHeading title="My Deliveries" isShowBackIcon={false} />,
          tabBarIcon: ({ color }) => <Icon name="local-shipping" color={color} />
        }}
      />
    </Tab.Navigator>
  );
};

export default DeliveryNavigator;
