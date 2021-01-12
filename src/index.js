/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RootNavigation from './navigation';
import colors from './utilities/colors';
//Added AWS Configure
import Amplify from '@aws-amplify/core'
import { Authenticator } from 'aws-amplify-react-native'
import awsconfig from '../aws-exports'
import { Auth } from 'aws-amplify'
import { Root } from 'popup-ui';



Amplify.configure({
  // ...awsconfig,
  Auth: {
    region: 'us-east-2',
    identityPoolId: 'us-east-2:4c7f6a3a-c745-4133-940f-3185e655a9f6',
    identityPoolRegion: 'us-east-2',
    userPoolId: 'us-east-2_jqz8JmdMT',
    userPoolWebClientId: '7i7laj1i64t2tfmjjfiraqq0ei',
  },
  authenticationFlowType: 'CUSTOM_AUTH',
  Analytics: {
    disabled: true
  }
})

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password',
    },
  ],
}


const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={s.container}>

        {/* Root */}
        <Root>
          <RootNavigation />
        </Root>
        {/* <Authenticator usernameAttributes="email" signUpConfig={signUpConfig} /> */}

      </SafeAreaView>
    </>
  );
};
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.$black
  }
});
// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

export default App;
