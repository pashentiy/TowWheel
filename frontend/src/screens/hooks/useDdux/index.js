import React, { useState, useEffect, useContext } from "react";
import { DduxContext } from 'src/lib'

/*
 * Hook for Ddux
 */
const useDdux = () => {
  const dduxContext = useContext(DduxContext);

  return dduxContext;
};


export default useDdux