import axios from 'axios';
import { StyleSheet, Text, View, Image  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Search from './screens/components/Search';
import Settings from './screens/Settings';
import DocumentContent from './screens/DocumentContent';
import DocumentDetail from './screens/DocumentDetail';
import AuditLog from './screens/AuditLog';
import { USERS_URL, roleName, IMAGES_URL } from './shareVariables';
import Profile from './screens/Profile';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const res = await axios.get(USERS_URL + '/me', { withCredentials: true });
            setUser(res.data.data.user);
        };

        if (!user) {
            checkAuth();
        }

    }, [user]);

    function Root() {
        return (
            <Drawer.Navigator>
                <Drawer.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        drawerLabel: () => (
                            <View style={styles.drawerItem}>
                                <Image source={{ uri: IMAGES_URL + "/" + user.avatar }} style={{ width: 30, height: 30, borderRadius: 15, marginRight: 15 }} />
                                <View style={styles.profile}>
                                    <Text style={styles.profileText}>{user.firstName} {user.lastName}</Text>
                                    <Text style={styles.profileTextSmall}>View profile</Text>
                                </View>
                            </View>
                        ),
                    }}
                    initialParams={{ user }}
                />
                <Drawer.Screen
                    name="Recent"
                    component={Home}
                    options={{
                        headerRight: () => <Search />,
                        drawerLabel: () => (
                            <View style={styles.drawerItem}>
                                <Icon name="access-time" size={20} color="#000" style={styles.icon} />
                                <Text style={styles.drawerLabel}>Recent</Text>
                            </View>
                        ),
                    }}
                />
                {
                    (user.role === roleName.Admin || user.role === roleName.Manager) && (
                        <Drawer.Screen
                            name="AuditLog"
                            component={AuditLog}
                            options={{
                                drawerLabel: () => (
                                    <View style={styles.drawerItem}>
                                        <Icon name="history" size={20} color="#000" style={styles.icon} />
                                        <Text style={styles.drawerLabel}>Audit Log</Text>
                                    </View>
                                ),
                            }}
                        />
                    )
                }
                <Drawer.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        drawerLabel: () => (
                            <View style={styles.drawerItem}>
                                <Icon name="settings" size={20} color="#000" style={styles.icon} />
                                <Text style={styles.drawerLabel}>Settings</Text>
                            </View>
                        ),
                    }}
                    initialParams={{ setUser }}
                />
            </Drawer.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    user ? (
                        <>
                            <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />
                            <Stack.Screen name="documentContent" component={DocumentContent} />
                            <Stack.Screen name="documentDetail" component={DocumentDetail} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={Login} initialParams={{ setUser }} />
                            <Stack.Screen name="SignUp" component={SignUp} initialParams={{ setUser }} />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 15,
    },
    drawerLabel: {
        fontSize: 16,
        color: '#000',
    },
    profile: {
        flexDirection: 'column',
    },
    profileText: {
        fontSize: 16,
        color: '#000',
    },
    profileTextSmall: {
        fontSize: 14,
        color: '#000',
    },
});