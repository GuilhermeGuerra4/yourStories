import React from "react";
import {Text, View, StyleSheet, FlatList, Dimensions, ActivityIndicator} from "react-native";
import {primaryColor} from "../assets/colors";
export default function List(props){

	function renderFooter(){
		if(props.isLoadingMore){
			return(<ActivityIndicator style={styles.loading} color={primaryColor} size={32} />)
		}
		else{
			return(<View></View>);
		}
	}

	return(
		<View>
			<FlatList 
				style={styles.scroll}
				data={props.stories}
				renderItem={props.renderStory}
				refreshing={props.isRefreshing}
				onRefresh={props.handleRefresh}
				keyExtractor={item => String(item.id)}
				onEndReached={props.onEndReached}
				onEndReachedThreshold={0.2}
				ListFooterComponent={renderFooter}
				/>
		</View>
	)
}

const styles = StyleSheet.create({
	scroll: {
		height: Dimensions.get('window').height - 122,
	},
	loading: {
		margin: 5,
	}
});