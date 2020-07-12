import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, Component, Text, TouchableOpacity, Image, ActivityIndicator} from "react-native";

import {primaryColor} from './assets/colors';
import {renderTabIcons, tabNavigationOptions} from './functions/toolbarUtils';
import {getHomeTabScreens, getEditorTabScreens, getMyStoriesTabScreens, getLoginPages} from "./pages";
import {AuthContext} from "./components/context";
import {GoogleSignin} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import api from './libraries/axios';

const Tab = createBottomTabNavigator();

GoogleSignin.configure({
	scopes: [],	
	webClientId: '123449495234-hvoe37lfffoqifs8hcb1c3m4umc851s4.apps.googleusercontent.com',
	offlineAccess: false,
	forceCodeForRefreshToken: true, 
});

const Routes = () => {

	const [state, dispatch] = React.useReducer(
	(prevState, action) => {
		switch(action.type){
			case "SIGN_IN":
				return {isLoading: false, idToken: action.googleToken, isSigned: true}
			case "SIGN_OUT":
				return {isLoading: false, isSigned: false}
			case "IS_LOADING":
				return {isLoading: true}
			default:
				return state;
		}
	}
	,{
		isLoading: true,
		token: null,
		isSigned: false,
	});

	const Auth = React.useMemo(() => ({	
		signIn: async () => {
			dispatch({type: "IS_LOADING"});	
			try {
				await GoogleSignin.hasPlayServices();
				const userInfo = await GoogleSignin.signIn();

				const data = [
					['googleToken', userInfo.idToken],
					['id', userInfo.user.id],
					['email', userInfo.user.email],
					['photo', userInfo.user.photo],
					['name', userInfo.user.name],
				];

				api.post('/signin', "token="+userInfo.idToken).then((res) => {
					if(res.data.status == true){
						data.push(['token', res.data.payload.token]);
						const save = async (data) => {
							await AsyncStorage.multiSet(data, () => {
								dispatch({type: "SIGN_IN", token: res.data.token});	
							});
						}
						save(data);
					}
					else{
						console.log(res.data);
					}
				}).catch((error) => {
					console.log(error);
				});
			} catch (error) {
				console.log(error);
			}
		},
		signOut: async () => {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
			const keys = await AsyncStorage.getAllKeys();
        	await AsyncStorage.multiRemove(keys);
	        dispatch({type: "SIGN_OUT"});
		},

	}), []);

		const verifyLogin = async () => {
			await AsyncStorage.getItem("token").then((token) => {
				if(token != null){
					dispatch({type: "SIGN_IN", token: token});
				}
				else{
					dispatch({type: "SIGN_OUT"});
				}
			});
		}
		verifyLogin();

	if(state.isLoading == false){
		return(
			state.isSigned ? (
				<NavigationContainer>
					<AuthContext.Provider value={Auth}>	
						<Tab.Navigator 
							screenOptions={({route}) => {return tabNavigationOptions(route)}}
							tabBarOptions={{
								showIcon: true,
								showLabel: false,
								activeTintColor: primaryColor,
								inactiveTintColor: 'gray',
							}}>
							<Tab.Screen 
								name="HomeScreen"
								options={{title: "Home"}} 
								component={getHomeTabScreens} />
							<Tab.Screen 
								name="EditorScreen" 
								options={{title: "Editor"}} 
								component={getEditorTabScreens} />
							<Tab.Screen 
								name="myStoriesScreen" 
								options={{title: "My Stories"}} 
								component={getMyStoriesTabScreens} />
						</Tab.Navigator>
					</AuthContext.Provider>
				</NavigationContainer>
			) : (
				<NavigationContainer>
					<AuthContext.Provider value={Auth}>
						{getLoginPages()}
					</AuthContext.Provider>
				</NavigationContainer>
			)

		)
	}
	else{
		return(<View></View>
		)
	}
};

export default Routes;