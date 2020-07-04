import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, Component, Text, TouchableOpacity, Image} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';  

//Screens
import ConfigurationScreen from "./screens/ConfigurationsScreen";
import EditorScreen from "./screens/EditorScreen";
import HomeScreen from "./screens/HomeScreen";
import MyStoriesScreen from "./screens/MyStoriesScreen";
import SigninScreen from "./screens/SigninScreen";
import StoryDetailsScreen from "./screens/StoryDetailsScreen";


function renderTabIcons(route, focused, color){
	var iconName = '';
	var size = 35;
	if(route.name === 'HomeScreen'){
		iconName = 'home';
	}
	else if(route.name === 'EditorScreen'){
		iconName = 'plus-square';
	}
	else if(route.name === 'myStoriesScreen'){
		iconName = 'folder';
	}

	return(
			<Icon name={iconName} color={color} size={size}/>  
		);
}

const options = (route) => {
	return({
		headerShown: false,
		tabBarIcon: ({focused, color, size}) => {
			return renderTabIcons(route, focused, color);
		},
	});
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

var is_signed = true;

const Routes = () => {
	return(
		is_signed ? (
			<NavigationContainer>
				<Tab.Navigator 
					screenOptions={({route}) => {return options(route)}}
					tabBarOptions={{
						showIcon: true,
						showLabel: false,
						activeTintColor: '#B232D1',
						inactiveTintColor: 'gray',
					}}>
					<Tab.Screen 
						name="HomeScreen"
						options={{title: "Home"}} 
						component={HomeScreen} />
					<Tab.Screen 
						name="EditorScreen" 
						options={{title: "Editor"}} 
						component={EditorScreen} />
					<Tab.Screen 
						name="myStoriesScreen" 
						options={{title: "My Stories"}} 
						component={MyStoriesScreen} />
				</Tab.Navigator>
			</NavigationContainer>
		) : (
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{headerShown: false}}>
					<Stack.Screen 
						name="SigninScreen" 
						component={SigninScreen}/>
				</Stack.Navigator>
			</NavigationContainer>
		)

	)
};

export default Routes;