import React, {useEffect, useState, useRef} from "react";
import {Components, 
	View, Text, TouchableWithoutFeedback,TouchableNativeFeedback,
	StyleSheet, ActivityIndicator, TextInput,ToastAndroid,
	TouchableOpacity,Image, ScrollView, Dimensions, FlatList} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import api from "../libraries/axios";
import AlternativeHeader from "../components/alternativeHeader";
import {primaryColor} from "../assets/colors";
import Icon from 'react-native-vector-icons/FontAwesome';  


export default function StoryDetailsScreen({navigation, route}){

	const [token, setToken] = useState(null);
	const [photo, setPhoto] = useState(false);
	const [userName, setUserName] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [StoryLoaded, setStoryLoaded] = useState(false);
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [enjoys, setEnjoys] = useState(0);
	const [isLiked, setIsLiked] = useState(false);
	const [comments, setComments] = useState([]);
	const [storyId, setStoryId] = useState(false);
	const [commentsPage, setCommentsPage] = useState(1);
	const [isLastCommentPage, setIsLastCommentPage] = useState(true);
	const [isLoadingComments, setIsLoadingComments] = useState(false);
	const [isEnjoying, setIsEnjoying] = useState(false);
	const [commentInput, setCommentInput] = useState("");
	const commentInputRef = useRef(null);
	const [isCommenting, setIsCommenting] = useState(false);


	navigation.dangerouslyGetParent().setOptions({
  		tabBarVisible: false
	});


	async function loadStory(){
		const story_id = route.params.story_id;
		await api.get('/get_story/'+token+'/'+story_id).then((res) => {
			if(res.data.status == true){
				if(res.data.payload.is_liked_by_user == true){
					setIsLiked(true);
				}
				setStoryLoaded(true);
				setStoryId(story_id);
				setTitle(res.data.payload.title);
				setText(res.data.payload.text);
				setEnjoys(res.data.payload.enjoys);
				setIsLoadingComments(true);
				getComments(story_id);
			}
			else{

			}
			setIsLoading(false);
		});
	}

	async function getComments(story_id){
		api.get('/get_comments/'+token+'/'+story_id+'/'+commentsPage+'/').then((res) => {
			if(res.data.status == true){
				setIsLastCommentPage(res.data.last_page);
				if(res.data.payload.size > 0){
					setComments([...comments, ...res.data.payload.data]);
					setCommentsPage(commentsPage + 1);
				}	
			}
		}).catch((error) => {
			console.log(error);
		}).then((res) => {
			setIsLoadingComments(false);
		});
	}

	async function loadMoreComments(){
		if(isLoadingComments == false){
			setIsLoadingComments(true);
			getComments(storyId);
		}
	}

	async function enjoyStory(){
		if(isEnjoying == false){
			setIsEnjoying(true);
			if(isLiked == false){
				setIsLiked(true);
				setEnjoys(enjoys+1);	
			}
			else{
				setIsLiked(false);
				setEnjoys(enjoys-1);
			}

			await api.post('/enjoy_story', "token="+token+'&story_id='+storyId).catch((res) => {
				alert(res);
			}).then(() => {
				setIsEnjoying(false);
			});
		}
	}

	async function handleInput(input){
		setCommentInput(input);
	}

	async function addComment(){
		if(isCommenting == false && commentInput.trim().length > 0){
			setComments([{'comment': commentInput, 'user_fullname': userName, 'user_photo': photo}, ...comments]);
			api.post('/add_comment', 'token='+token+'&story_id='+storyId+'&comment='+commentInput)
			.then((res) => {
				if(res.data.status == true){			
					setIsCommenting(true);
					commentInputRef.current.blur();
					setCommentInput("");
					setIsCommenting(false);
				}
				else{
					ToastAndroid.show("Comment failed to post", ToastAndroid.SHORT);
				}
			}).catch((res) => {
				ToastAndroid.show("Comment failed to post", ToastAndroid.SHORT);
			});
		}
	}

	useEffect(() => {
		AsyncStorage.multiGet(['token', 'photo', 'name'], (err, stores) => {
			stores.map((result, i, store) => {
				let key = store[i][0];
				let value = store[i][1];
				if(key == 'token'){
					setToken(value);
				}
				else if(key == 'photo'){
					setPhoto(value);
				}
				else if(key == 'name'){
					setUserName(value);
				}
			});
		});
	}, []);

	useEffect(() => {
		if(token != null && StoryLoaded == false){
			loadStory();
		}
	}, [token]);


	if(isLoading){
		return(
			<View>
				<ActivityIndicator size={42} color={primaryColor} style={styles.loading}/>
			</View>
		)
	}
	else{
		return(
			<View>
				<AlternativeHeader 
					title={"Story"} 
					navigation={navigation} 
					callback={navigation.goBack}/>
				<ScrollView keyboardShouldPersistTaps={'handled'} style={styles.scroll}>
					<View style={styles.container}>
						<Text style={styles.title}>{title}</Text>
						<View style={styles.storyContainer}>
							<Text 
								selectionColor={primaryColor}
								selectable={true} 
								style={styles.text}>
								{text}
							</Text>
						</View>
					</View>

					<View style={styles.painel}>
						<View style={styles.enjoy}>
							<TouchableOpacity onPress={enjoyStory}>
								<Icon 
									style={styles.enjoyClick}
									name={"heart"}
									size={32}
									color={isLiked ? "#ff0000" : "#333"}/>
							</TouchableOpacity>
			
							<Text style={styles.enjoyCounter}>{enjoys}</Text>
						</View>
					</View>

					<View style={styles.commentBar}>
						
						<TextInput 
							multiline={true} 
							numberOfLines={2}
							placeholder={"Comment"}
							ref={commentInputRef}
							value={commentInput}
							onPress={() => {commentInputRef.blur()}}
							onChangeText={handleInput} 
							selectionColor={primaryColor}
							style={styles.commentBox} />

						<View style={styles.commentBtc}>
							<TouchableOpacity style={styles.touch} onPress={addComment}>
								<Icon name={"paper-plane"} style={styles.icon} color={"#666"} size={30}/>
							</TouchableOpacity>
						</View>

						<View style={styles.comments}>
							{comments.map((value, index) => {
								return(
									<View key={index} style={styles.comment}>
										<View style={styles.user}>
											<Image 
											style={styles.userphoto} 
											source={{uri: value.user_photo}}/>
											<Text style={styles.username}>{value.user_fullname}</Text>
										</View>
										<View>
											<Text>
												{value.comment}
											</Text>
										</View>
									</View>
								)
							})}

							{isLoadingComments == true ? (
							<ActivityIndicator 
								color={primaryColor}
								style={styles.commentsLoading}
								size={30}/>
							) : (<View></View>)}

						</View>

						{isLastCommentPage == false && isLoadingComments == false ? (
								<View>
									<TouchableOpacity onPress={loadMoreComments}>
										<Text style={styles.loadMore}>Load more</Text>
									</TouchableOpacity>
								</View>
							) : (<View></View>) 
						}

					</View>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	scroll: {
		height: Dimensions.get('window').height - 50,
	},
	container: {
		marginTop: 10,
		width: "93%",
		alignSelf: "center",
	},
	storyContainer: {
		width: "100%",
	},
	title: {
		fontSize: 30,
		color: "#222",
		fontWeight: "bold",
	},
	text: {
		fontSize: 19,
	},
	loading: {
		marginTop: 50,
	},
	painel: {
		width: "95%",
		height: "auto",
		backgroundColor: "#fff",
		padding: 10,
		marginTop: 10,
		alignSelf: "center",
	},
	commentBar: {
		width: "95%",
		height: "auto",
		backgroundColor: "#fff",
		padding: 10,
		marginTop: 10,
		marginBottom: 350,
		alignSelf: "center",
	},
	commentBox: {
		backgroundColor: "#f9f9f9",
		paddingLeft: 10,
		marginBottom: 10,
		paddingRight: 70,
	},
	enjoy: {
		flexDirection: "row",
	},
	enjoyCounter: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#333",
		marginLeft: 5,
	},
	touch: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	comments: {

	},
	icon: {
		backgroundColor: "#ddd",
		padding: 12,
	},
	commentBtc: {
		position: "absolute",
		right: 0,
		top: 0,
		height: 70,
		width: 65,
		margin: 3,
		justifyContent: "center",
		alignItems: "center",
	},
	comment: {
		padding: 10,
		borderWidth: 1,
		borderColor: "#f1f1f1",
	},
	user: {
		flexDirection: "row",
	},
	username: {
		margin: 7,
		fontSize: 17,
		color: "#222",
	},
	userphoto: {
		width: 40,
		height: 40,
		borderRadius: 50,
	},
	loadMore: {
		color: "#0088ff",
		fontSize: 17,
		alignSelf: "flex-start",
		marginTop: 10,
		marginBottom: 8,
	},
	commentsLoading: {
		marginTop: 10,
		marginBottom: 10,
	},
});