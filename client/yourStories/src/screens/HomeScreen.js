import React, {useContext, useState, useEffect, useStateCallback} from "react";

import {Components,
	View, Text, TouchableOpacity, FlatList,
	StyleSheet, Dimensions, ActivityIndicator} from "react-native";

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

	function goTo(){
		navigation.navigate('ConfigurationsScreen');
	}


	function loadStories(){
		console.log("LOADING ITEMS: "+page);
		if(isLoading == false){
			setIsLoading(true);
			if(token != null){
				api.get('/get_stories/'+token+'/'+page+'/').then((res) => {
					if(res.data.status == true){
						if(res.data.size != 0 && res.data.payload != undefined){
							setStoriesCount(storiesCount => storiesCount+res.data.size);
							setPage(page => page+1);
							setStories([...stories, ...res.data.payload]);
							setIsEmpty(false);
							setIsLoading(false);
							setStatus('loaded');
						}
						else{
							setStatus('server_error');
						}
					}
				}).catch(() => {
					setStatus('connection_error');
				});
			}
		}
	}
	
	useEffect(() => {
		console.log("componentDidMount");
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
		console.log("tokenLoaded");
		if(token != null && storiesCount == 0){
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

	function handleRefresh(){
		if(isRefreshing == false){
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
			console.log("refresh");
		}
	}, [isRefreshing]);

	function getContent(){
		if(status == 'isLoading'){
			return(<Loading />);
		}
		else if(status == 'connection_error' || status == 'server_error'){
			return(<StatusMessage />);
		}
		else if(status == 'loaded'){
			return(
				<List 
					stories={stories}
					renderStory={renderStory}
					isRefreshing={isRefreshing}
					handleRefresh={handleRefresh}/>
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