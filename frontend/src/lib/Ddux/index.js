import React, { useState, useEffect, useRef, useCallback } from 'react';
import Config from 'src/config';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DduxContext = React.createContext({
    data: () => { },
    cache: () => { },
    setData: () => { },
    setCache: () => { }
});
