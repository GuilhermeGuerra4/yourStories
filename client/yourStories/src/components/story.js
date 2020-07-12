import React from "react";
import {View,
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	TouchableWithNativeFeedback} 
from "react-native";

export default function Story(props){

	var navigation = props.navigation;

	function goToStoryDetailsScreen(){
		var story_id = props.story_id;
		navigation.navigate('StoryDetailsScreen', {'story_id': story_id});
	}

	function getTitle(title){
		if(title.length > 70){
			return title.substr(0, 70)+'...';
		}	
		else{
			return title;
		}
	}

	return(
			<TouchableOpacity activeOpacity={0.6} onPress={goToStoryDetailsScreen}>
				<View style={style.container}>
					<View style={style.sub}>
						<Text style={style.title}>{getTitle(props.title)}</Text>
					</View>

					<View style={style.sub}>
						<Text style={style.preview}>{props.preview}...</Text>
						<Text style={style.readmore}>(Read more)</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
}

const style = StyleSheet.create({
	container: {
		width: "100%",
		height: "auto",
		borderBottomWidth: 1,
		paddingBottom: 10,
		paddingTop: 10,
		borderBottomColor: "#ccc",
		backgroundColor: "#fff",
		alignItems: "center",
	},	
	sub: {
		width: "90%",
		height: "auto",
	},
	title: {
		fontSize: 17,
		fontWeight: "bold",
		color: "#222",
	},
	preview: {
		color: "#333",
	},
	readmore: {
		fontWeight: "bold",
		color: "#0099ff",
		margin: 0,
	},
});