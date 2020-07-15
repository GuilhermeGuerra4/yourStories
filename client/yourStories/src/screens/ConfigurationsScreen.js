import React, {useContext, useState, useEffect} from "react";
import {Components, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Share} from "react-native";
import AlternativeHeader from "../components/alternativeHeader";
import {primaryColor} from "../assets/colors";
import Icon from 'react-native-vector-icons/FontAwesome';  
import {AuthContext} from "../components/context"; 
import { useFocusEffect } from '@react-navigation/native';


export default function ConfigurationScreen({navigation}){
		
	useEffect(() => {
		console.log(navigation);
		/*navigation.dangerouslyGetParent().setOptions({
  			tabBarVisible: false
		});*/
	}, []);

	function goBack(){
		navigation.goBack();
	}

	const authManager = useContext(AuthContext);
	const signout = async () => {
		setIsSignedOut(true);
		authManager.signOut();
	};

	const share = async () => {
		const result = await Share.share({message:'hi'});
	};

	const [isSigningOut, setIsSignedOut] = useState(false);

	if(isSigningOut == true){
		return(
			<View style={styles.cont}>
				<ActivityIndicator color={primaryColor} size={60}/>
			</View>
		)
	}
	else{
		return(
			<View style={styles.back}>
				<AlternativeHeader navigation={navigation} title={"Configurations"} callback={goBack}/>
				<View style={styles.container}>
					<TouchableOpacity onPress={share} style={styles.touchableArea}>
						<Text style={styles.share}>Share App</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={signout} style={styles.touchableArea}>
						<Text style={styles.logout}>Logout</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	back: {
		flex: 1,
		backgroundColor: "#fff",
	},
	cont: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	container: {
		alignSelf: "center",
		marginTop: 10,
		width: "90%",
	},
	share: {
		fontSize: 20,
	},
	logout: {
		fontSize: 20,
		color: "#fd0000",
	},
	touchableArea: {
		alignSelf: "flex-start",
		padding: 10,
		margin: 0,
		height: "auto",
	},
});