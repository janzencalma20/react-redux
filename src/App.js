// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import ThemeLocalization from "./components/ThemeLocalization";
import './App.css';
import React from "react";

// ----------------------------------------------------------------------

export default function App() {

  return (

    <ThemeConfig>
      <ThemePrimaryColor>
        <ThemeLocalization>
          <RtlLayout>
            {/*<NotistackProvider>*/}
            <ScrollToTop />
            <Router/>
            {/*</NotistackProvider>*/}
          </RtlLayout>
        </ThemeLocalization>
      </ThemePrimaryColor>
    </ThemeConfig>

  );
}
