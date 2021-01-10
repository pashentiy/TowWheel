import React, { useMemo, useState } from 'react';
import { View, TextInput, Image, SectionList, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { images } from '../../utilities';
import Countries from '../../assets/flags.json';

const { searchIcon } = images;

const ItemView = (params) => {
    let text = `${params.item.name} (+${params.item.callingCode})`;
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.itemTextContainer} onPress={() => params.action(params.item)}>
                <Image source={{ uri: params.item.flag }} style={styles.flag} />
                <Text numberOfLines={1} style={styles.itemText}>{text}</Text>
            </TouchableOpacity>
            <View style={styles.itemSeparator} />
        </View>
    );
};

const SectionHeader = params => (
    <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>{params.title}</Text>
    </View>
);

const generateSectionData = (countryList) => {
    const sections = [];
    const sectionHeaders = countryList.map(data => data.name.charAt(0));
    const uniqueHeaders = Array.from(new Set(sectionHeaders));

    uniqueHeaders.forEach((item) => {
        const filtered = countryList.filter(country => country.name.charAt(0) === item);
        sections.push({ title: item, data: filtered });
    });

    return sections;
}

const CountrySelection = ({ selected, action }) => {
    const [data, setData] = useState(Countries);

    const sections = useMemo(() => {
        return generateSectionData(data);
    }, [data]);

    const onChangeSearchText = (text) => {
        const filtered = Countries.filter(country => country.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
        setData(filtered);
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchView}>
                    <Image source={searchIcon} style={styles.searchIcon} />
                    <TextInput
                        autoCompleteType='off'
                        autoCorrect={false}
                        style={styles.textInput}
                        placeholder='Search'
                        placeholderTextColor="#2d2926"
                        enablesReturnKeyAutomatically
                        clearButtonMode="while-editing"
                        onChangeText={onChangeSearchText}
                    />
                </View>
            </View>
            <SectionList
                renderItem={({ item, index, section }) => (
                    <ItemView
                        item={item}
                        index={index}
                        section={section}
                        action={action}
                        selected={selected}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => (<SectionHeader title={title} />)}
                sections={sections}
                keyExtractor={(item, index) => item + index}
            />
        </View>
    )
}

export default CountrySelection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageBackground: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    searchContainer: {
        height: 83,
        backgroundColor: '#f4f4f4',
    },
    searchView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#bdbdbd30',
        borderWidth: 0,
        borderRadius: 6,
        margin: 20,
        alignItems: 'center',
    },
    searchIcon: {
        width: 16,
        height: 16,
        marginHorizontal: 10,
    },
    textInput: {
        flex: 1,
    },
    sectionContainer: {
        height: 36,
        backgroundColor: '#f4f4f4',
        justifyContent: 'center',
    },
    sectionHeader: {
        marginLeft: 20,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2d292670',
    },
    itemContainer: {
        height: 45,
        backgroundColor: '#ffffff',
        justifyContent: 'flex-end',
    },
    itemTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#444444',
        flex: 1,
    },
    itemSeparator: {
        height: 1,
        marginLeft: 20,
        backgroundColor: '#bdbdbd30',
        marginBottom: 0,
    },
    flag: {
        width: 30,
        height: 30,
        marginHorizontal: 20,
        borderRadius: 15,
    },
    selectionTick: {
        width: 20,
        height: 20,
        marginRight: 20,
    },
    selectionView: {
        alignItems: 'flex-end',
    }
});