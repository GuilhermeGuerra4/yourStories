import React, { useState, useContext, useEffect} from "react";
import {
	Components,
	View,
	Text,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
	Image,
	AsyncStorage,
	ActivityIndicator,
} from "react-native";

import {primaryColor, primaryColorDarker} from "../assets/colors";
import {GoogleSignin,GoogleSigninButton,statusCodes} from '@react-native-community/google-signin';
import {AuthContext} from "../components/context";
import  i18n  from '../libraries/tradution';


export default function SigninScreen({navigation}){

	const authManager = useContext(AuthContext);
	const [isSigningIn, setIsSigningIn] = useState(false);
	
	const signin = async () => {
		await setIsSigningIn(true);
	};

	function goToTerms(){
		navigation.navigate("TermsScreen");
	}

	useEffect(() => {
		if(isSigningIn == true){
			authManager.signIn();
		}
	}, [isSigningIn]);

	return(
		<View style={style.background}>
			<StatusBar backgroundColor={primaryColorDarker}/>
			<Image source={require('../assets/images/logo.png')} style={style.logo}/>
			<Text style={style.title}>{i18n.t("SigninScreen.read_and_write_stories")}</Text>
			<View style={style.googleSigninButton}>
				<GoogleSigninButton
					style={{ width: "65%", height: 55 }}
					size={GoogleSigninButton.Size.Wide}
					onPress={signin}
					color={GoogleSigninButton.Color.Dark}/>
			</View>
			<View style={style.terms}>
				<Text style={style.termsText}> 
					{i18n.t("SigninScreen.by_signing_you_agree_with_our")}
				</Text>
				<TouchableOpacity style={style.toucharea} onPress={goToTerms}>
					<Text style={style.termsTextLink}> {i18n.t("SigninScreen.terms")}</Text>
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
		fontSize: 16,
		color: "#fff",
	},
	termsTextLink: {
		fontSize: 16,
		color: "#00aaFF",
	},
	loading: {
		marginTop: 50,
	},
});