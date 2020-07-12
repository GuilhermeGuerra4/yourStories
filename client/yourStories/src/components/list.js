import React from "react";
import {Text, View, StyleSheet, FlatList, Dimensions} from "react-native";

export default function List(props){
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
				onEndReachedThreshold={0.8}
				/>
		</View>
	)
}

const styles = StyleSheet.create({
	scroll: {
		height: Dimensions.get('window').height - 122,
	},
});