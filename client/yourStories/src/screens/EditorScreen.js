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
	ActivityIndicator,
	ToastAndroid,
	Text} from "react-native";

import { WebView } from 'react-native-webview';

import { useFocusEffect } from '@react-navigation/native';
import api from "../libraries/axios";
import AsyncStorage from "@react-native-community/async-storage";
import Header from "../components/header";
import Loading from "../components/loading";
import {primaryColor} from "../assets/colors";


export default function EditorScreen({navigation, route}){

	const [token, setToken] = useState(null);
	const [photo, setPhoto] = useState(null);
	const [name, setName] = useState("");
	const storyInput = useRef(null);
	const [type, setType] = useState('view');
	const [text, setText] = useState("");
	const [sketchId, setSketchId] = useState(false);
	const [inputHeight, setInputHeight] = useState(Dimensions.get('window').height - 155);
	const [isSaving, setIsSaving] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [isFocus, setIsFocus] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	function _keyboardDidShow(e){
		if(isFocus){
			navigation.dangerouslyGetParent().setOptions({
	  			tabBarVisible: false,
			});
			setInputHeight(Dimensions.get('window').height - e.endCoordinates.height - 105);
		}
	}

	function _keyboardDidHide(e){
		if(isFocus){
			navigation.dangerouslyGetParent().setOptions({
	  			tabBarVisible: true,
			});
			setInputHeight(Dimensions.get('window').height - 155);
		}
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
	}, []);

	useEffect(()=>{
		console.log("init");
		if(token != null && text.length == 0){
			load_sketch();
		}
	}, [token]);


	useEffect(()=>{
		setIsFocus(true);
		navigation.addListener("blur", function(){
			Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
			Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
			setIsFocus(false);
		});

		navigation.addListener("focus", function(){
			Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
			Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

			if(text.length == 0 && token != null){
				setIsLoading(true);
				load_sketch();	
			}
			setIsFocus(true);
		});
	}, []);


	function handle_save_sketch(){
		save_sketch();
	}
	function handle_publish(){
		if(text.trim() != ""){
			setIsSaving(true);
			api.put("/save_sketch", "text="+text+"&token="+token).then((res) => {
				if(res.data.status == true){
					setText("");
					setIsSaving(false);
					navigation.navigate("PublishScreen", {"id": res.data.id, "token": token});
				}
			});
		}
		else{
			ToastAndroid.show("Must write something before publish", ToastAndroid.SHORT);
		}
	}

	function save_sketch(){
		if(text.trim() != ""){
			setIsSaving(true);
			api.put("/save_sketch", "text="+text+"&token="+token).then((res) => {
				
				if(res.data.status == true){
					setSketchId(res.data.id);
					ToastAndroid.show("Sketch saved", ToastAndroid.SHORT);
				}
				else{
					ToastAndroid.show("Error during saving", ToastAndroid.SHORT);
				}
				
				setIsSaving(false);
			});
		}
		else{
			ToastAndroid.show("Must write something before save", ToastAndroid.SHORT);
		}
	}
	function load_sketch(){
		api.get("/get_sketch/"+token+"/", {}).then((res) => {
			if(res.data.status == true){
				setSketchId(res.data.payload.id);
				setText(res.data.payload.text); 
			}

			setIsLoading(false);
		});
	}
	function handleChange(text){
		setText(text);
	}

	function getIsSaving(){
		if(isSaving){
			return(<ActivityIndicator style={styles.saving} size={20} color={primaryColor}/>);
		}
		else{
			return(<View style={styles.saving}></View>)
		}
	}

	return(
		<View style={styles.container}>
			<Header profile_image={photo} navigation={navigation}/>
			
			{isLoading == true ? (
				<View>
					<Loading />
				</View>				
			) : (
				<View style={styles.web}>
					<TextInput 
						placeholder={"Start writting your story..."}
						multiline={true}
						ref={storyInput}
						onChangeText={handleChange}
						value={text}
						style={[{height:inputHeight}, styles.input]}/>
				</View>
			)}


			<View style={styles.toolbar}>
				<TouchableOpacity onPress={handle_save_sketch} style={styles.touchable}>
					<Text style={styles.touchtext}>Save sketch</Text>
				</TouchableOpacity>	

				<TouchableOpacity onPress={handle_publish} style={styles.touchable}>
					<Text style={styles.touchtext}>Publish</Text>
				</TouchableOpacity>	

				<View>
					{getIsSaving()}
				</View>
			</View>
		</View>
	)
}


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
		paddingTop: 10,
		paddingBottom: 30,
		textAlignVertical: "top",
		fontSize: 20,
	},
	saving: {
		width: 20,
	},
});