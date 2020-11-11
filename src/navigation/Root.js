import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigation from './AppNavigator';

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <AppNavigation />
        </NavigationContainer>
    );
}

export default RootNavigation;