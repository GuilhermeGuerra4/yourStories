import React from "react";
import {Components, View, Text, TouchableOpacity} from "react-native";

export default function HomeScreen({navigation}){
	
	function goTo(){
		navigation.navigate('ConfigurationsScreen');
	}

	return(
			<View>
				<TouchableOpacity onPress={() => {goTo()}}>
					<Text>HomeScreen</Text>
				</TouchableOpacity>
			</View>
		)
}