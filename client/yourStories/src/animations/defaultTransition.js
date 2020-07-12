import {TransitionSpecs} from "@react-navigation/stack";

export const DefaultTransition = {
	  gestureDirection: 'horizontal',
	  transitionSpec: {
	    open: TransitionSpecs.TransitionIOSSpec,
	    close: TransitionSpecs.TransitionIOSSpec,
	  },
	  cardStyleInterpolator: ({ current, next, layouts }) => {
	    return {
	      cardStyle: {
	        transform: [
	          {
	            translateX: current.progress.interpolate({
	              inputRange: [0, 1],
	              outputRange: [layouts.screen.width, 0],
	            }),
	          },
	 
	        ],
	      },
	     
	    };
	  },
	}
