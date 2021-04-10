import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput
} from 'react-native';

const AutoResizeInputBox = ({ maxNumOfLines=4, containerStyle, ...props }) => {

    const [containerHeight, setContainerHeight] = useState(undefined)
    const [initialContainerHeight, setInitialContainerHeight] = useState(undefined)
    const [initialTextBoxHeight, setInitialTextBoxHeight] = useState(undefined)

    const onContainerLayout = event => {
        if (initialContainerHeight) return
        let {width, height} = event.nativeEvent.layout
        setInitialContainerHeight(height)
    }

    const onTextboxLayout = event => {
        if (initialTextBoxHeight) return 
        let {width, height} = event.nativeEvent.layout
        setInitialTextBoxHeight(height)
    }

    if(containerHeight)
        containerStyle = {...containerStyle, height: containerHeight}

    return (
        <View onLayout={onContainerLayout} style={[containerStyle]}>
            <TextInput 
            onLayout={onTextboxLayout}
            multiline={true}
            onContentSizeChange={({ nativeEvent: { contentSize: { width, height } } }) => {
                let allowedMaxHeight = (maxNumOfLines - 1) * initialTextBoxHeight
                if(height >= allowedMaxHeight){
                    setContainerHeight((allowedMaxHeight-initialTextBoxHeight)+initialContainerHeight)
                }
                else
                    setContainerHeight(undefined)
            }}
            {...props}
            />
        </View>
    );
}


export default AutoResizeInputBox



