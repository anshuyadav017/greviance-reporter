import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

const FooterWrapper = () => {
    const location = useLocation();
    const hiddenRoutes = ['/login', '/register'];

    if (hiddenRoutes.includes(location.pathname)) {
        return null;
    }

    return <Footer />;
};

export default FooterWrapper;
