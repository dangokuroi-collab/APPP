import React from 'react';
import { View } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth);

    return (
        <View style={styles.container}>
             <Text h2>Profile</Text>
             <Text>Email: {user?.email}</Text>
             <Text>Role: {user?.role}</Text>
             <Button title="Logout" onPress={() => dispatch(logout() as any)} containerStyle={{ marginTop: 20 }} />
        </View>
    );
}


export default Profile;
