import React from "react";
import {Text, View, StyleSheet, ActivityIndicator} from "react-native";
import {primaryColor} from "../assets/colors";

export default function Loading(props){
	return(
		<View style={styles.loadingView}>
			<ActivityIndicator size={40} color={props.color != undefined ? props.color : primaryColor} style={styles.loading}/>
		</View>
	)
}

const styles = StyleSheet.create({
	loadingView: {
		flex: 1,
		justifyContent: "center",
	},
	loading: {
		marginTop: 100,
		margin: 10,
	},
});