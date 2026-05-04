
/**
 * App.tsx
 * Copyright (c) 2023 James Ugbanu.
 * Licensed under the MIT License.
 */


import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import StackNavigator from "./navigations/StackNavigator";
import TabNavigator from "./navigations/TabNavigator";
import AdminNavigator from "./navigations/AdminNavigator";
import DeliveryNavigator from "./navigations/DeliveryNavigator";
import { theme } from './styles/Theme';
import store from "./store";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './localization/i18n';

const myTheme = createTheme({
  ...theme,
  mode: 'light',
  components: {
    Text: {
      h1Style: {
        fontWeight: '700',
        fontSize: 34
      },
      h2Style: {
        fontWeight: '300',
      },
      h3Style: {
        fontWeight: '300',
        fontSize: 14
      },
      h4Style: {
        fontWeight: '300',
        fontSize: 11
      },
    },
    Button: {
      buttonStyle: {
        backgroundColor: '#DB3022',
        borderRadius: 25,
        paddingVertical: 15,
      },
      containerStyle: {
        height: 48,
      },
      titleStyle: {
        fontSize: 14
      }
    }
  }

});

const RootApp = () => {
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          dispatch(setUser(JSON.parse(storedUser)));
        }
      } catch (error) {
        // console.error('Error loading user', error);
      }
    };
    loadUser();
  }, [dispatch]);

  const renderNavigator = () => {
    if (!isAuthenticated) return <StackNavigator />;

    switch (user?.role) {
      case 'ADMIN':
        return <AdminNavigator />;
      case 'DELIVERY':
        return <DeliveryNavigator />;
      default:
        return <TabNavigator />;
    }
  };

  return (
    <NavigationContainer>
      <ThemeProvider theme={myTheme}>
        {renderNavigator()}
      </ThemeProvider>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootApp />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
