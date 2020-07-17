import React, {useState, useEffect} from "react";
import {Components, View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator} from "react-native";
import Header from "../components/header";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../libraries/axios"; 
import {primaryColor} from "../assets/colors";
import Icon from 'react-native-vector-icons/FontAwesome';  
import Loading from "../components/loading";

export default function myStoriesScreen({navigation}){

	const [token, setToken] = useState(null);
	const [photo, setPhoto] = useState(null);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [stories, setStories] = useState([]);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [downLoading, setDownLoading] = useState(false);
	const [storiesEnded, setStoriesEnded] = useState(false);

	useEffect(() => {
		AsyncStorage.multiGet(['token', 'photo'], (err, stores) => {
			stores.map((result, i, store) => {
				let key = store[i][0];
				let value = store[i][1];
				if(key == 'token'){
					setToken(value);
				}
				else if(key == 'photo'){
					setPhoto(value);
				}
			});
		});
	}, []);

	useEffect(()=>{
		if(token != null && stories.length == 0){
			loadMyStories();
		}
	}, [token]);

	function loadMyStories(){
		if(isLoading == false && downLoading == false && storiesEnded == false){
			if(page == 1){
				setIsLoading(true);
			}
			else{
				setDownLoading(true);
			}
			api.get("/get_my_stories/"+token+"/"+page+"/").then((res)=>{
				if(res.data.status == true){
					if(res.data.last_page == true){
						setStoriesEnded(true);
					}
					setStories([...stories, ...res.data.payload]);
					setPage(page => page + 1);
				}	
				setIsRefreshing(false);
				setDownLoading(false);	
				setIsLoading(false);
			}).catch(() => {
				ToastAndroid.show("hallo", ToastAndroid.SHORT);
			});
		}
	}

	function handleOnEndReached(){
		loadMyStories();
	}

	function goToStory(id){
		navigation.navigate("StoryDetailsScreen", {story_id: id});
	}

	function handleRefresh(){
		refresh();
	}

	function refresh(){
		if(isRefreshing == false){
			setIsRefreshing(true);
			setStories(stories => []);
			setPage(1);				
		}	
	}
	useEffect(() => {
		if(isRefreshing == true && stories.length == 0){
			loadMyStories();
		}
	}, [isRefreshing]);

	function renderFooter(){
		if(downLoading){
			return(<ActivityIndicator style={styles.downloading} color={primaryColor} size={32} />)
		}
		else{
			return(<View></View>);
		}
	}


	function render_story(story){
		return(
			<TouchableOpacity onPress={() => {goToStory(story.item.id)}}>
				<View style={styles.container}>
					<View>
						<Text style={styles.title}>{story.item.title}</Text>
					</View>
					
					<View style={[styles.inline]}>
						<View style={[styles.inline, styles.margin]}>
							<Icon name={"eye"} size={25}/>
							<Text style={styles.count}>{story.item.views}</Text>
						</View>

						<View style={styles.inline}>
							<Icon name={"heart"} size={25}/>
							<Text style={styles.count}>{story.item.enjoys}</Text>
						</View>

						<View style={styles.inline}>
							<Icon name={"comments"} size={25}/>
							<Text style={styles.count}>{story.item.enjoys}</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

	if(isLoading){
		return(
			<View>
				<Header navigation={navigation} profile_image={photo} />
				<Loading/>
			</View>
		);
	}
	else{
		return(
			<View>
				<Header navigation={navigation} profile_image={photo} />
				<FlatList 
					style={styles.list}
					data={stories}
					renderItem={render_story}
					onEndReached={handleOnEndReached}
					onEndReachedThreshold={0.5}
					refreshing={isRefreshing}
					onRefresh={handleRefresh}
					keyExtractor={item => String(item.id)}
					ListFooterComponent={renderFooter}
					/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	list: {
		height: Dimensions.get('window').height - 122,
	},
	container: {
		width: "100%",
		height: "auto",
		padding: 10,
		backgroundColor:"#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#ddd"
	},
	inline: {
		flexDirection: "row", 
	},
	margin: {

	},
	count: {
		marginLeft: 5,
		marginRight: 5,
		fontSize: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 5,
		marginBottom: 10,
	},
	loading: {
		marginTop: 80,
	},
	downloading: {
		margin: 20,
	},
});