import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {primaryColor} from "../assets/colors";

export default function StatusMessage(props){

	function renderCallbackButton(){
		return(
			<TouchableOpacity onPress={props.buttonCallback} style={styles.button}>
				<Text style={styles.buttonText}>Try again</Text>
			</TouchableOpacity>
		);
	}

	return(
		<View style={styles.container}>
			<Text style={styles.status}>{props.message}</Text>
			{props.hasCallback ? renderCallbackButton() : false}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	status: {
		fontSize: 19,
		color: "#555",
		marginTop: 20,
	},
	button: {
		alignSelf: "center",
		backgroundColor: primaryColor,
		borderRadius: 3,
		padding: 8,
		marginTop: 20,
	},
	buttonText: {
		fontSize: 18,
		color: "#fff",
	},
});
