import React, { FunctionComponent, useState } from 'react';

import { Layout, Empty, Skeleton } from 'antd';
import { useAsyncEffect } from '../effects/async';
import { websocket } from '../services/websocket';

const { Sider } = Layout;

export const AppMenu: FunctionComponent = () => {
  const [builds, setBuilds] = useState();
  useAsyncEffect(async () => {
    websocket.on('builds', builds => {
      setBuilds(builds);
    });
  }, []);

  console.log(builds);

  return (
    <Sider width={300} style={{ background: '#fff' }}>
      {!builds && <Skeleton />}
      {builds && !builds.length && <Empty />}
      {builds && (
        <div>
          {builds.map(build => (
            <div key={build._id}>
              {build.workflowIdentifier} - {build.state}
            </div>
          ))}
        </div>
      )}
    </Sider>
  );
};
