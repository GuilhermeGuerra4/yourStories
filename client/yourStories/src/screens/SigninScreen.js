import React, { useState, useContext } from "react";
import {
	Components,
	View,
	Text,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
	Image,
	AsyncStorage,
} from "react-native";

import {primaryColor, primaryColorDarker} from "../assets/colors";
import {GoogleSignin,GoogleSigninButton,statusCodes} from '@react-native-community/google-signin';
import {AuthContext} from "../components/context";


export default function SigninScreen({navigation}){

	const authManager = useContext(AuthContext);
	const signin = async () => {
		authManager.signIn();
	};

	return(
		<View style={style.background}>
			<StatusBar backgroundColor={primaryColorDarker}/>
			<Image source={require('../assets/images/logo.png')} style={style.logo}/>
			<Text style={style.title}>Read and write stories</Text>
			<View style={style.googleSigninButton}>
				<GoogleSigninButton
					style={{ width: "65%", height: 55 }}
					size={GoogleSigninButton.Size.Wide}
					onPress={signin}
					color={GoogleSigninButton.Color.Dark}/>
			</View>
			<View style={style.terms}>
				<Text style={style.termsText}> 
					By signin you agree with our 
				</Text>
				<TouchableOpacity>
					<Text style={style.termsTextLink}> terms</Text>
				</TouchableOpacity>
			</View>
		</View>
		)
}

const style = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: primaryColor,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#fff",
	},
	logo: {
		width: 120,
		height: 120,
	},
	googleSigninButton: {
		width: "100%",
		alignItems: "center",
		marginTop: 30,
	},
	terms: {
		position: "absolute",
		bottom: 20,
		flexDirection: "row",
	},
	termsText: {
		fontSize: 14,
		color: "#fff",
	},
	termsTextLink: {
		color: "#00aaFF",
	},
});