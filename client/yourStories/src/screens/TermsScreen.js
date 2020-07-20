import React, {} from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
} from "react-native";

import AlternativeHeader from "../components/alternativeHeader";
import  i18n  from '../libraries/tradution';

export default function TermsScreen({navigation}){

	function goBack(){
		navigation.navigate("SigninScreen");
	}

	return(
		<View>
			<AlternativeHeader navigation={navigation} title={i18n.t("TermsScreen.title")} callback={goBack}/>
			<View>
				<ScrollView style={styles.scroll}>
					<Text style={styles.terms}>
						{i18n.t("TermsScreen.terms")}
					</Text>
				</ScrollView>
			</View>
		</View>
	)
	
}

const styles = StyleSheet.create({
	scroll: {
		marginBottom: 100,
	},
	terms: {
		padding: 14,
		fontSize: 18,
	}
});