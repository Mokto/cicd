import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, Divider } from 'antd';

import { AppLayout } from './layout';
import { startBuildApi, getWorkflowsApi } from './api';
import { useAsyncEffect } from './effects/async';
import { IWorkflowResponse } from '../../api/src/models/workflows';

export const App: React.FC = () => {
  
  const [workflowsDefinition, setWorkflowsDefinition] = useState<IWorkflowResponse>();
  
  useAsyncEffect(async () => {
    const result = await getWorkflowsApi();
    setWorkflowsDefinition(result);
  }, []);

  return (
    <>
      <CssBaseline />
      <AppLayout>
        <div>
          {workflowsDefinition && workflowsDefinition.workflows.map(workflow => {
            return (
              <>
                <Divider orientation="left">{workflow.Identifier}</Divider>
                <Button type="primary" shape="round" icon="build" size="large" onClick={() => startBuildApi(workflow.Identifier)}>
                  Build
                </Button>
              </>
            )
          })}
        </div>
      </AppLayout>
    </>
  );
}
