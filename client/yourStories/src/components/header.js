import React from "react";
import {View, Text, Image, StyleSheet, StatusBar, TouchableOpacity} from "react-native";
import {primaryColor, primaryColorDarker} from "../assets/colors";

export default function Header(){
	return(
			<View style={style.container}>
				<StatusBar backgroundColor={primaryColorDarker}/>	
				<Image style={style.logo} source={require('../assets/images/logo.png')}/> 
				<View style={style.profileContainer}>
					<TouchableOpacity>
						<Image style={style.profilePicture} source={{uri: "https://lh3.googleusercontent.com/a-/AOh14GidSZ_f_dvKAOOss_hcTS66iWhhTvc7cDXQty_y=s96-c"}} />
					</TouchableOpacity>
				</View>
			</View>
		);
}

const style = StyleSheet.create({
	container: {
		width: "100%",
		height: 50,
		backgroundColor: primaryColor,
		flexDirection: "row",
	},	
	logo: {
		width: 40,
		height: 40,
		margin: 5,
		borderRadius: 10,
		backgroundColor: primaryColorDarker,
	},
	profileContainer: {
		position: "absolute",
		width: "auto",
		height: "100%",
		right: 0,
	},
	profilePicture: {
		width: 40,
		height: 40,
		margin: 5,
		borderRadius: 100 / 2,
		padding: 5,
	},
});