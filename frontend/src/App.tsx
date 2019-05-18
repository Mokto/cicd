import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, Divider } from 'antd';

import { AppLayout } from './layout';
import { startBuildApi } from './api';

// <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

export const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <AppLayout>
        <div>
          <Divider orientation="left">Test build</Divider>
          <Button type="primary" shape="round" icon="build" size="large" onClick={startBuildApi}>
            Build
          </Button>
        </div>
      </AppLayout>
    </>
  );
}
