import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, Component, Text, TouchableOpacity, Image} from "react-native";

//Screens
import ConfigurationsScreen from "./screens/ConfigurationsScreen";
import EditorScreen from "./screens/EditorScreen";
import HomeScreen from "./screens/HomeScreen";
import MyStoriesScreen from "./screens/MyStoriesScreen";
import PublishScreen from "./screens/StoryDetailsScreen";
import SigninScreen from "./screens/SigninScreen";
import StoryDetailsScreen from "./screens/StoryDetailsScreen";


import {renderTabIcons, tabNavigationOptions} from './functions/toolbarUtils';

// stacks
const SigninStack = createStackNavigator();
const HomeTabStack = createStackNavigator();
const EditorTabStack = createStackNavigator();
const MyStoriesTabStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function getHomeTabScreens(){
	return(
			<HomeTabStack.Navigator>
				<HomeTabStack.Screen 
					name="HomeScreen"
					options={{headerShown: false}}
					component={HomeScreen}/>
				<HomeTabStack.Screen 
					name="StoryDetailsScreen"
					options={{headerShown: false}}
					component={StoryDetailsScreen}/>
				<HomeTabStack.Screen 
					name="ConfigurationsScreen"
					options={{headerShown: false}}
					component={ConfigurationsScreen}/>
			</HomeTabStack.Navigator>
		)
}
function getEditorTabScreens(){
	return(
			<EditorTabStack.Navigator>
				<EditorTabStack.Screen 
					name="EditorScreen"
					options={{headerShown: false}}
					component={EditorScreen}/>
				<EditorTabStack.Screen 
					name="PublishScreen"
					options={{headerShown: false}}
					component={PublishScreen}/>
				<EditorTabStack.Screen 
					name="ConfigurationsScreen"
					options={{headerShown: true}}
					component={ConfigurationsScreen}/>
			</EditorTabStack.Navigator>
		)
}
function getMyStoriesTabScreens(){
	return(
		<MyStoriesTabStack.Navigator>
			<MyStoriesTabStack.Screen 
				name="MyStoriesScreen"
				options={{headerShown: false}}
				component={MyStoriesScreen}/>
			<MyStoriesTabStack.Screen 
				name="StoryDetailsScreen"
				options={{headerShown: false}}
				component={StoryDetailsScreen}/>
		</MyStoriesTabStack.Navigator>
	)
}

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
						activeTintColor: '#B232D1',
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
						component={MyStoriesScreen} />
				</Tab.Navigator>
			</NavigationContainer>
		) : (
			<NavigationContainer>
				<SigninStack.Navigator
					screenOptions={{headerShown: false}}>
					<SigninStack.Screen 
						name="SigninScreen" 
						component={SigninScreen}/>
				</SigninStack.Navigator>
			</NavigationContainer>
		)

	)
};

export default Routes;