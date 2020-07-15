import React, {useEffect, useState, useRef} from "react";
import {
	Components,
	View, 
	StyleSheet,
	TextInput,
	ScrollView,
	Keyboard,
	Dimensions,
	TouchableOpacity,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Text} from "react-native";

import { WebView } from 'react-native-webview';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import Header from "../components/header";


export default function EditorScreen({navigation, route}){

	const [token, setToken] = useState(null);
	const [photo, setPhoto] = useState(null);
	const [name, setName] = useState("");
	const inputRef = useRef(null);
	const [type, setType] = useState('view');
	const [text, setText] = useState("");
	const [inputHeight, setInputHeight] = useState(Dimensions.get('window').height - 155);

	function _keyboardDidShow(e){
		navigation.dangerouslyGetParent().setOptions({
  			tabBarVisible: false,
		});
		setInputHeight(Dimensions.get('window').height - e.endCoordinates.height - 105);
	}

	function _keyboardDidHide(e){
		navigation.dangerouslyGetParent().setOptions({
  			tabBarVisible: true,
		});
		setInputHeight(Dimensions.get('window').height - 155);
	}
	
	useEffect(() => {
		AsyncStorage.multiGet(['token', 'photo', 'name'], (err, store) => {
			store.map((result, i, store) => {
				let key = store[i][0];
				let value = store[i][1];
				if(key == 'token'){
					setToken(value);
				}
				else if(key == 'photo'){
					setPhoto(value);
				}
				else if(key == 'name'){
					setName(value);
				}
			});
		});

		Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    	Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
	}, []);

	const styles = StyleSheet.create({
		container: {
			width: "100%",
			height: "100%",
		},
		web: {
			width: "100%",
			height: 300,
		},
		toolbar: {
			position: "absolute",
			width: "100%",
			height: 50,
			borderTopWidth: 1,
			borderTopColor: "#f1f1f1",
			backgroundColor: "#fff",
			flexDirection:"row",
			alignItems: "center",
			justifyContent: "center",
			bottom: 0,
		},
		touchable: {
			marginRight: 10,
			padding: 10,
		},
		touchtext: {
			color: "#0088ff",
		},
		input: {
			padding: 20,
			paddingTop: 0,
			textAlignVertical: "top",
			fontSize: 20,
			height: inputHeight, 
		},
	});

	let lorem = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
	lorem += "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. FIM.";
	return(
		<View style={styles.container}>
			<Header profile_image={photo} navigation={navigation}/>
			<View style={styles.web}>
				<TextInput 
					placeholder={"Start writting your story..."}
					multiline={true}
					value={lorem}
					style={styles.input}/>
			</View>

			<View style={styles.toolbar}>
				<TouchableOpacity style={styles.touchable}>
					<Text style={styles.touchtext}>Save sketch</Text>
				</TouchableOpacity>	

				<TouchableOpacity style={styles.touchable}>
					<Text style={styles.touchtext}>Publish</Text>
				</TouchableOpacity>	
			</View>
		</View>
	)
}