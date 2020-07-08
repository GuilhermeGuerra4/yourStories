import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, Component, Text, TouchableOpacity, Image} from "react-native";

import {primaryColor} from './assets/colors';
import {renderTabIcons, tabNavigationOptions} from './functions/toolbarUtils';

import {getHomeTabScreens, getEditorTabScreens, getMyStoriesTabScreens, getLoginPages} from "./pages";


const Tab = createBottomTabNavigator();

var is_signed = false;

const Routes = () => {
	return(
		is_signed ? (
			<NavigationContainer>
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
			</NavigationContainer>
		) : (
			<NavigationContainer>
				{getLoginPages()}
			</NavigationContainer>
		)

	)
};

export default Routes;