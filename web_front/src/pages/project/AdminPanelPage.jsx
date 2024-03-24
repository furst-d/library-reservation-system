import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const AdminPanelPage = () => {

    return (
        <HelmetProvider>
            <Helmet>
                <title>Admin panel</title>
            </Helmet>
            <div>
                Admin panel
            </div>
        </HelmetProvider>
    );
};

export default AdminPanelPage;
