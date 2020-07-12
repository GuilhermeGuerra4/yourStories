import React from "react";
import {Text, View, StyleSheet} from "react-native";

export default function StatusMessage(props){
	return(
		<View>
			<Text style={styles.status}>{props.message}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	status: {
		alignSelf: "center",
		fontSize: 17,
		color: "#333",
		marginTop: 20,
	},
});
