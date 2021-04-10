import React, { useState, useEffect, useRef } from 'react';
import {
    Keyboard,
    Text,
    View,
    StyleSheet
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Screen from 'src/screens';
import { Mixins, Spacing, Typography } from 'src/styles';
import { useTheme, useLanguage, useDdux } from 'src/hooks'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawerContent = ({ navigation, ...props }) => {
    const [Colors, styles] = useTheme(style)
    const language = useLanguage()
    const Ddux = useDdux()
    const user = Ddux.cache('user')
    return (
        <DrawerContentScrollView
            contentContainerStyle={{
                paddingTop: 0
            }}
            {...props}
        >
            <Header user={user} language={language} />
            {(user && Object.keys(user).length > 0) && 
            <>
            <DrawerItemList 
            activeTintColor={Colors.primary}
            activeBackgroundColor={Colors.secondary20}
            {...props} 
            />
            <DrawerItem
                label="Logout"
                onPress={() => { Ddux.setCache('user',null); AsyncStorage.clear(); navigation.replace('Splash')}}
            />
            </>
            }
            {(!user || Object.keys(user).length == 0) && <TouchableOpacity onPress={()=>{navigation.toggleDrawer();navigation.push('Login')}}>
            <View style={styles.button}>
                <View style={styles.buttonIconWrapper}>
                    <Icon name='sign-in' color={Colors.white} size={Typography.FONT_SIZE_22} />
                </View>
                <Text style={styles.buttonText}>{language.t('sign_in')}</Text>
            </View>
            </TouchableOpacity>}
            <View style={styles.seperator}></View>
            <DrawerItem
                icon = {({ focused, color, size }) => <Icon color={color} size={size} name={'book'} />}
                label="Help"
                onPress={() => Linking.openURL('https://mywebsite.com/help')}
            />
            <DrawerItem
                icon = {({ focused, color, size }) => <Icon color={color} size={size} name={'folder'} />}
                label="FAQ"
                onPress={() => Linking.openURL('https://mywebsite.com/help')}
            />
            <DrawerItem
                icon = {({ focused, color, size }) => <Icon color={color} size={size} name={'save'} />}
                label="Privacy Policy"
                onPress={() => Linking.openURL('https://mywebsite.com/help')}
            />
        </DrawerContentScrollView>
    );
}

const Header = ({user,language}) => {
    const [Colors, styles] = useTheme(style)
    const toggleLanguage = (locale)=>{
        language.changeLanguage(locale)
    }

    return (
        <View style={styles.header}>
            <View style={[styles.flex1,styles.justifyEnd,styles.paddingBottom10,styles.paddingLeft10]}>
                <View style={styles.profilePicture}>
                    <Text style={styles.profilePictureAltText}>{(user && user.name)?user.name.charAt(0).toUpperCase():'G'}</Text>
                </View>
                <Text style={styles.name}>{(user && user.name)?user.name:'Guest User'}</Text>
                <Text style={styles.number}>{(user && user.mobile)?'+'+user.mobile:'Please sign in.'}</Text>
            </View>
            <View style={styles.languageToggle}>
                <TouchableOpacity onPress={()=>toggleLanguage('en')} style={[styles.marginBottom10]}>
                    <View style={[styles.languageButton,language.language=='en'?styles.languageButtonActive:null]}>
                        <Text style={styles.languageOption}>🇺🇸</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>toggleLanguage('he')}>
                    <View style={[styles.languageButton,language.language=='he'?styles.languageButtonActive:null]}>
                        <Text style={styles.languageOption}>🇮🇱</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = ({ Colors }) => (StyleSheet.create({
    header: {
        height: Mixins.scaleSize(140),
        backgroundColor: Colors.primary,
        marginBottom: Spacing.SCALE_20,
        flexDirection: 'row'
    },
    button: {
        marginTop: Spacing.SCALE_30,
        marginBottom: Spacing.SCALE_30,
        width: Mixins.scaleSize(150),
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: Colors.primary_dark,
        flexDirection: 'row',
        padding: Spacing.SCALE_5
    },
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
        flex: 1,
        fontSize: Typography.FONT_SIZE_18
    },
    buttonIconWrapper: {
        backgroundColor: Colors.primary_light,
        height: Mixins.scaleSize(30),
        width: Mixins.scaleSize(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    seperator:{
        width: '90%',
        alignSelf: 'center',
        height: 1,
        backgroundColor: Colors.grey
    },
    languageToggle: {
        width: Mixins.scaleSize(60),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    languageButton: {
        borderWidth: 2,
        borderColor: Colors.primary_light,
        justifyContent: 'center',
        alignItems: 'center',
        width: Mixins.scaleSize(40),
        height: Mixins.scaleSize(40),
        borderRadius: 50,
    },
    languageButtonActive:{
        backgroundColor: Colors.primary_light,
    },
    languageOption: {
        fontSize: Typography.FONT_SIZE_25
    },
    profilePicture:{
        backgroundColor: Colors.primary_dark,
        width: Mixins.scaleSize(60),
        height: Mixins.scaleSize(60),
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.SCALE_8
    },
    profilePictureAltText:{
        fontSize: Typography.FONT_SIZE_30,
        color: Colors.secondary
    },
    name:{
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.white
    },
    number:{
        fontSize: Typography.FONT_SIZE_12,
        color: Colors.secondary_very_light
    }
}))


export default CustomDrawerContent