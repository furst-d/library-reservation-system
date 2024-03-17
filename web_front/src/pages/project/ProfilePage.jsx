import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const ProfilePage = props => {

    return (
        <HelmetProvider>
            <Helmet>
                <title>Profil</title>
            </Helmet>
            <div>
                Profil
            </div>
        </HelmetProvider>
    );
};

export default ProfilePage;
