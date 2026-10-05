import React, { useEffect, useRef } from 'react';

const Layout = ({ children }) => {
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!hasInitialized.current) {
      window.onload = () => setTimeout(() => window.WidgetApp_v1?.mount("header-bar"), 500);
      hasInitialized.current = true;
    }
  }, []);
  return (
    <>
      <div id="header-bar"></div>
      {children}
    </>
  );
};

export default Layout;