import React, {useContext, useState, useEffect, useStateCallback} from "react";

import {Components,
	View, Text, TouchableOpacity, FlatList,
	ToastAndroid, StyleSheet, Dimensions, ActivityIndicator} from "react-native";

import Header from '../components/header';
import Story from '../components/story';
import Loading from "../components/loading";
import StatusMessage from "../components/statusMessage";
import List from "../components/list";

import {AuthContext} from "../components/context";
import AsyncStorage from '@react-native-community/async-storage';
import api from "../libraries/axios";
import {primaryColor} from "../assets/colors";

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
						else{
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

	useEffect(() => {
		if(token != null && storiesCount == 0){
			setIsLoading(true);
			loadStories();
		}
	}, [token]);

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