import React from "react";
import {View, Text, Image, StyleSheet, StatusBar, TouchableOpacity} from "react-native";
import {primaryColor, primaryColorDarker} from "../assets/colors";
import Icon from 'react-native-vector-icons/FontAwesome';  

export default function AlternativeHeader(props){
		
	function goBack(){
		props.callback();
	}

	return(
			<View style={styles.container}>
				<StatusBar backgroundColor={primaryColorDarker}/>	
				<TouchableOpacity onPress={goBack}>
					<Icon name={"arrow-left"} style={styles.goBackButton} color={"#444"} size={35}/>
				</TouchableOpacity>

				<Text style={styles.title}>{props.title}</Text>
			</View>
		);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 50,
		backgroundColor: "#fff",
		elevation: 3,
		flexDirection: "row",
	},	
	goBackButton: {
		margin: 6,
	},
	title: {
		fontSize: 20,
		marginTop: 12,
		fontWeight: "bold",
		marginLeft: 4,
	},
});