import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Main from './pages/main';
import Product from './pages/product';

const AppNavigator = createStackNavigator({
    Main:{
        screen: Main,
    },
    Product:{
        screen: Product,
    }
}, {
    defaultNavigationOptions:{
        headerStyle: {
          backgroundColor: '#DA552F',
        },
        headerTintColor: '#FFF'
    }
});

export default createAppContainer(AppNavigator);