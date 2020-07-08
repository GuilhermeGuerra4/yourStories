import React from "react";
import {Components, View, Text, TouchableOpacity, ScrollView, StyleSheet} from "react-native";
import Header from '../components/header';
import Story from '../components/story';

export default function HomeScreen({navigation}){
	
	function goTo(){
		navigation.navigate('ConfigurationsScreen');
	}

	var elements = [1,2,3,4,5,6,7,8,9,10,11,12,13];

	return(
			<View>
				<Header navigation={navigation} profile_image="https://lh3.googleusercontent.com/a-/AOh14GidSZ_f_dvKAOOss_hcTS66iWhhTvc7cDXQty_y=s96-c" />

				<View>
					<ScrollView style={style.scroll}>
					
					{elements.map((value, index) => {
        				return <Story navigation={navigation} key={value} story_id={value} title={"title "+value} preview={"preview" + value} />
      				})}

					</ScrollView>
				</View>
			</View>
		)
}

const style = StyleSheet.create({
	scroll: {
		marginBottom: 100,
	},
});