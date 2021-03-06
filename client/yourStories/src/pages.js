import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// stacks
const HomeTabStack = createStackNavigator();
const EditorTabStack = createStackNavigator();
const MyStoriesTabStack = createStackNavigator();
const SigninStack = createStackNavigator();

//Screens
import ConfigurationsScreen from "./screens/ConfigurationsScreen";
import EditorScreen from "./screens/EditorScreen";
import HomeScreen from "./screens/HomeScreen";
import MyStoriesScreen from "./screens/MyStoriesScreen";
import PublishScreen from "./screens/PublishScreen";
import SigninScreen from "./screens/SigninScreen";
import StoryDetailsScreen from "./screens/StoryDetailsScreen";
import TermsScreen from "./screens/TermsScreen";


import {DefaultTransition} from "./animations/defaultTransition";

const options = {
	headerShown: false,
	...DefaultTransition,
};

export function getHomeTabScreens(){
	return(
		<HomeTabStack.Navigator screenOptions={options}>
			<HomeTabStack.Screen 
				name="HomeScreen"
				component={HomeScreen}/>
			<HomeTabStack.Screen 
				name="StoryDetailsScreen"
				component={StoryDetailsScreen}/>
			<HomeTabStack.Screen 
				name="ConfigurationsScreen"
				component={ConfigurationsScreen}/>
		</HomeTabStack.Navigator>
	)
}
export function getEditorTabScreens(){
	return(
		<EditorTabStack.Navigator>
			<EditorTabStack.Screen 
				name="EditorScreen"
				options={options}
				component={EditorScreen}/>
			<EditorTabStack.Screen 
				name="PublishScreen"
				options={options}
				component={PublishScreen}/>
			<EditorTabStack.Screen 
				name="ConfigurationsScreen"
				options={options}
				component={ConfigurationsScreen}/>
		</EditorTabStack.Navigator>
	)
}
export function getMyStoriesTabScreens(){
	return(
		<MyStoriesTabStack.Navigator>
			<MyStoriesTabStack.Screen 
				name="MyStoriesScreen"
				options={options}
				component={MyStoriesScreen}/>
			<MyStoriesTabStack.Screen 
				name="ConfigurationsScreen"
				options={options}
				component={ConfigurationsScreen}/>
			<MyStoriesTabStack.Screen 
				name="StoryDetailsScreen"
				options={options}
				component={StoryDetailsScreen}/>
		</MyStoriesTabStack.Navigator>
	)
}

export function getLoginPages(){
	return(
		<SigninStack.Navigator
			screenOptions={{headerShown: false}}>
			<SigninStack.Screen 
				name="SigninScreen" 
				options={options}
				component={SigninScreen}/>
			<SigninStack.Screen 
				name="TermsScreen" 
				options={options}
				component={TermsScreen}/>
		</SigninStack.Navigator>
	)
}