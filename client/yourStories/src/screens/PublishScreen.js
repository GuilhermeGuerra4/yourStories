import React, {useEffect, useState, useRef} from "react";
import {Components, View, Text, TextInput, Keyboard, StyleSheet, TouchableNativeFeedback, ActivityIndicator, ToastAndroid} from "react-native";
import AlternativeHeader from "../components/alternativeHeader";
import {primaryColor} from "../assets/colors";
import api from "../libraries/axios";
import  i18n  from '../libraries/tradution';


export default function PublishScreen({navigation, route}){
	const sketch_id = route.params.id;
	const token = route.params.token;
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState("");
	const titleInput = useRef(null);
	const tagsInput = useRef(null);
	const [isPublising, setIspubling] = useState(false);

	useEffect(()=>{
		navigation.dangerouslyGetParent().setOptions({
  			tabBarVisible: false,
		});
	});

	function goBack(){
		navigation.goBack();
	}

	function publish(){
		if(title.trim() == ""){
			ToastAndroid.show(i18n.t("PublishScreen.title_cannot_be_empty"), ToastAndroid.SHORT);
		}
		else{
			setIspubling(true);
			api.post("/publish_sketch", "token="+token+"&id="+sketch_id+"&title="+title+"&tags="+tags).then((res) => {
				if(res.data.status == true){
					ToastAndroid.show(i18n.t("PublishScreen.story_published"), ToastAndroid.SHORT);
					goBack();
				}
				else{
					ToastAndroid.show(i18n.t("PublishScreen.error_during_publishing_story"), ToastAndroid.SHORT);
				}
				setIspubling(false);
			}).catch((res) => {
				ToastAndroid.show(i18n.t("PublishScreen.error_during_publishing_story"), ToastAndroid.SHORT);
			});
		}

	
	}

	function handleChangeTitle(title){
		setTitle(title);
	}

	function handleChangeTags(tags){
		setTags(tags);
	}

	return(
		<View>
			<AlternativeHeader callback={goBack} navigation={navigation} title={i18n.t("PublishScreen.headerTitle")}/>
			<TextInput 
				value={title} 
				onChangeText={handleChangeTitle}
				ref={titleInput}
				style={styles.input}	
				placeholder={i18n.t("PublishScreen.title")}/>
			
			<TextInput 
				multiline={true}
				numberOfLines={5}
				value={tags}
				ref={tagsInput}
				onChangeText={handleChangeTags}
				style={[styles.input, {textAlignVertical: "top"}]}
				placeholder={i18n.t("PublishScreen.hashtags")}/>

			<TouchableNativeFeedback disabled={isPublising} onPress={publish}>
				{isPublising == false ? (
					<View style={styles.btc}>
						<Text style={styles.textd}>{i18n.t("PublishScreen.publish")}</Text>
					</View>

					) : (

				<View style={styles.btc}>
					<ActivityIndicator size={30} color={"#fff"}/>
				</View>

					)}
			</TouchableNativeFeedback>

			
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		width: "90%",
		alignSelf: "center",
		marginTop: 20,
		paddingLeft: 10,
		elevation: 2,
		backgroundColor: "#fff",
	},
	btc: {
		padding: 10,
		width: "90%",
		height: 40,
		alignSelf: "center",
		marginTop: 20,
		alignItems: "center",
		elevation: 2,
		justifyContent: "center",
		backgroundColor: primaryColor,
	},
	textd: {
		color: "#fff",
	}
});