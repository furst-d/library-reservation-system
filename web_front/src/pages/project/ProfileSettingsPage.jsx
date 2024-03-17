import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const ProfileSettingsPage = () => {

    return (
        <HelmetProvider>
            <Helmet>
                <title>Uživatelské nastavení</title>
            </Helmet>
            <div>
                Uživatelské nastavení
            </div>
        </HelmetProvider>
    );
};

export default ProfileSettingsPage;
