import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

export default function Story(){
	return(
			<TouchableOpacity>
				<View style={style.container}>
					<View style={style.sub}>
						<Text style={style.title}>Lorem Ipsum is simply dummy text of the</Text>
					</View>

					<View style={style.sub}>
						<Text style={style.preview}>Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsume Aldus PageMaker including versions of Lorem Ipsum...</Text>
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
	},
});