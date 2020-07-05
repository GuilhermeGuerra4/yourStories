import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';  


export function renderTabIcons(route, focused, color){
	var iconName = '';
	var size = 35;
	if(route.name === 'HomeScreen'){
		iconName = 'home';
	}
	else if(route.name === 'EditorScreen'){
		iconName = 'plus-square';
	}
	else if(route.name === 'myStoriesScreen'){
		iconName = 'folder';
	}

	return(<Icon name={iconName} color={color} size={size}/>);
}

export function tabNavigationOptions(route){
	return({
		headerShown: false,
		tabBarIcon: ({focused, color, size}) => {
			return renderTabIcons(route, focused, color);
		},
	});
};