import React from "react";
import {Text, View, StyleSheet} from "react-native";

export default function StatusMessage(){
	return(
		<View>
			<Text style={styles.status}>Not connected to internet</Text>
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
