import React, { FunctionComponent } from 'react';
import { Layout } from 'antd';
import { AppMenu } from './menu'
import { AppHeader } from './header'


export const AppLayout: FunctionComponent = ({children}) => {

    // const [mobileOpen, setMobileOpen] = React.useState(false);
    return (
        <Layout style={{ height: "100vh" }}>
            <AppHeader />
            <Layout>
                <AppMenu />
                <Layout style={{ padding: '0 24px' }}>
                    {children}
                </Layout>
            </Layout>
        </Layout>
    );
}