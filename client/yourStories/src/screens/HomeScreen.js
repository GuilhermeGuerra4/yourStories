import React, {useContext, useState, useEffect, useStateCallback} from "react";

import {Components,
	View, Text, TouchableOpacity, FlatList,
	ToastAndroid, StyleSheet, Dimensions, ActivityIndicator} from "react-native";

import { useFocusEffect } from '@react-navigation/native';

import Header from '../components/header';
import Story from '../components/story';
import Loading from "../components/loading";
import StatusMessage from "../components/statusMessage";
import List from "../components/list";

import {AuthContext} from "../components/context";
import AsyncStorage from '@react-native-community/async-storage';
import api from "../libraries/axios";
import {primaryColor} from "../assets/colors";

import OneSignal from 'react-native-onesignal';

OneSignal.init("ee55f1f7-08c2-43f9-9778-332d4841c436");
OneSignal.inFocusDisplaying	(function(){});


export default function HomeScreen({navigation}){


	const [stories, setStories] = useState([]);
	const [storiesCount, setStoriesCount] = useState(0);
	const [token, setToken] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [isEmpty, setIsEmpty] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [photo, setPhoto] = useState(null);
	const [status, setStatus] = useState('isLoading');
	const [isFinish, setIsFinish] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [pushNotificationEnabled, setPushNotificationEnabled] = useState(null);
	const [pushToken, setPushToken] = useState(null);

	function goTo(){
		navigation.navigate('ConfigurationsScreen');
	}

	function loadStories(){
		if(isLoading == false && isFinish == false){
			if(token != null){
				if(page != 1){
					setIsLoadingMore(true);
				}
				setIsLoading(true);
				api.get('/get_stories/'+token+'/'+page+'/').then((res) => {
					if(res.data.last_page == true){
						setIsFinish(true);
					}
					if(res.data.status == true){
						if(res.data.size != 0 && res.data.payload != undefined){
							setStoriesCount(storiesCount => storiesCount+res.data.size);
							setPage(page => page+1);
							setStories([...stories, ...res.data.payload]);
							setIsEmpty(false);
							setStatus('loaded');
						}
						else if(page == 1){
							setStatus('empty');
						}
					}
					else{
						setStatus('server_error');
					}
				}).catch(() => {
					setStatus('connection_error');
				}).then(() => {
					if(page != 1){
						setIsLoadingMore(false);
					}
					setIsLoading(false);
				})
			}
		}
	}

	function loadMoreStories(){
		loadStories();
	}

	useFocusEffect(() => {
		navigation.dangerouslyGetParent().setOptions({
  			tabBarVisible: true
		});
	});
	
	useEffect(() => {
		AsyncStorage.multiGet(['token', 'photo', 'pushNotificationEnabled'], (err, stores) => {
			stores.map((result, i, store) => {
				let key = store[i][0];
				let value = store[i][1];
				if(key == 'token'){
					setToken(value);
				}
				else if(key == 'photo'){
					setPhoto(value);
				}
				else if(key == 'pushNotificationEnabled'){
					if(value == null || value == false){
						setPushNotificationEnabled(false);
					}
					else if(value == "enabled"){
						setPushNotificationEnabled(true);
					}
				}
			});
		});
	}, []);


	useEffect(() => {
		
		function onReceived(e){

		}

		function onOpened(e){
			navigation.navigate("StoryDetailsScreen", {story_id: 1});
		}

		function onIds(e){
			console.log(e.userId);
			setPushToken(e.userId);
		}

		OneSignal.addEventListener('received', onReceived);
		OneSignal.addEventListener('opened', onOpened);
		OneSignal.addEventListener('ids', onIds);

		if(token != null && storiesCount == 0){
			setIsLoading(true);
			loadStories();
		}
	}, [token]);

	useEffect(()=>{
		if(pushNotificationEnabled != null){
			if(pushNotificationEnabled == false && pushToken != null){
				console.log("adding token");
				api.post("/add_push_token", "token="+token+"&push_token="+pushToken).then((res)=>{
					console.log(res.data);
					if(res.data.status == true){
						AsyncStorage.setItem("pushNotificationEnabled", "enabled");
					}
				});
			}
		}
	}, [pushNotificationEnabled]);

	function renderStory(story){
		return (   
			<Story 
				navigation={navigation}
				story_id={story.item.id}
				preview={story.item.preview}
				title={story.item.title} />
		)
	}

	function refresh(){
		if(isRefreshing == false){
			setIsFinish(false);
			setStatus('isLoading');
			setIsRefreshing(true);
			setStories(stories => []);
			setStoriesCount(0);
			setPage(1);				
		}	
	}
	useEffect(() => {
		if(isRefreshing == true && storiesCount == 0 && stories.length == 0){
			setIsRefreshing(false);	
			loadStories();
		}
	}, [isRefreshing]);

	function reload(){
		refresh();
	}
	function getContent(){
		if(status == 'isLoading'){
			return(<Loading />);
		}
		if(status == 'empty'){
			if(page == 1){
				return(
					<StatusMessage 
						message={"No stories were found"}/>);
			}
		}
		else if(status == 'connection_error' || status == 'server_error'){
			if(page == 1){
				return(
					<StatusMessage 
						buttonCallback={reload} 
						hasCallback={true}
						message={"Internet connection not detected"}/>
				);
			}
			else{
    			ToastAndroid.show("Internet connection not detected", ToastAndroid.SHORT);
			}
		}
		else if(status == 'loaded'){
			return(
				<List 
					stories={stories}
					renderStory={renderStory}
					isRefreshing={isRefreshing}
					onEndReached={loadMoreStories}
					isLoadingMore={isLoadingMore}
					handleRefresh={refresh}/>
				);
		}
	}

	return(
			<View>
				<Header navigation={navigation} profile_image={photo} />
				{getContent()}
			</View>
		)
}