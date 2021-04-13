import React, { useState, useEffect, useContext, useMemo } from "react";
import { LanguageContext } from '../../lib'

/*
 * Hook for Theme and Language setup
 */
const useLanguage = () => {
    return useContext(LanguageContext);
  };
  
  
  export default useLanguage