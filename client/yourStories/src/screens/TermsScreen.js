import React, {} from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
} from "react-native";

import AlternativeHeader from "../components/alternativeHeader";


export default function TermsScreen({navigation}){

	function goBack(){
		navigation.navigate("SigninScreen");
	}

	return(
		<View>
			<AlternativeHeader navigation={navigation} title={"Terms"} callback={goBack}/>
			<View>
				<ScrollView style={styles.scroll}>
					<Text style={styles.terms}>
						Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa.
						Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo
						tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.
						È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione,
						pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei
						ogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum,
						e più recentemente da software di impaginazione come Aldus PageMaker, che includeva
						versioni del Lorem Ipsum.
						Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa.
						Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo
						tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.
						È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione,
						pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei
						ogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum,
						e più recentemente da software di impaginazione come Aldus PageMaker, che includeva
						versioni del Lorem Ipsum.
						Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa.
						Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo
						tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.
						È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione,
						pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei
						ogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum,
						e più recentemente da software di impaginazione come Aldus PageMaker, che includeva
						versioni del Lorem Ipsum FIM.
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