import React, { useState, useEffect, useContext, useMemo } from "react";
import { ThemeContext } from 'src/lib'
import { Styles } from 'src/styles'
/*
 * Hook for Theme and Language setup
 */
const useTheme = (style={}) => {
    const {colors, theme, changeTheme, themeKeys} = useContext(ThemeContext);
    const replaceWithColor = (match, capture) => {
      return colors ? colors[capture]+'\"' : '#FFF'+'\"'
    }