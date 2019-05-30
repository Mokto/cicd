import React, { useState, ReactElement } from 'react';
import { Button, Divider } from 'antd';

import { AppLayout } from './layout';
import { startBuildApi, getWorkflowsApi } from './api';
import { useAsyncEffect } from './effects/async';
import { WorkflowResponse } from '../../api/src/models/workflows';
import { websocket } from './services/websocket';

export const App: React.FC = (): ReactElement => {
  const [workflowsDefinition, setWorkflowsDefinition] = useState<WorkflowResponse>();

  useAsyncEffect(async () => {
    const result = await getWorkflowsApi();
    setWorkflowsDefinition(result);
  }, []);

  useAsyncEffect(async () => {
    console.log(websocket);
  }, []);

  return (
    <>
      <AppLayout>
        <div>
          {workflowsDefinition &&
            workflowsDefinition.workflows.map(workflow => {
              return (
                <div key={workflow.Identifier}>
                  <Divider orientation="left">{workflow.Identifier}</Divider>
                  <Button
                    type="primary"
                    shape="round"
                    icon="build"
                    size="large"
                    onClick={() => startBuildApi(workflow.Identifier)}
                  >
                    Build
                  </Button>
                </div>
              );
            })}
        </div>
      </AppLayout>
    </>
  );
};
