// package: protos
// file: github-actions.proto

import * as jspb from "google-protobuf";

export class WorkflowRequest extends jspb.Message {
  getFilecontent(): string;
  setFilecontent(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WorkflowRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WorkflowRequest): WorkflowRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WorkflowRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WorkflowRequest;
  static deserializeBinaryFromReader(message: WorkflowRequest, reader: jspb.BinaryReader): WorkflowRequest;
}

export namespace WorkflowRequest {
  export type AsObject = {
    filecontent: string,
  }
}

export class WorkflowResponse extends jspb.Message {
  clearActionsList(): void;
  getActionsList(): Array<Action>;
  setActionsList(value: Array<Action>): void;
  addActions(value?: Action, index?: number): Action;

  clearWorkflowsList(): void;
  getWorkflowsList(): Array<Workflow>;
  setWorkflowsList(value: Array<Workflow>): void;
  addWorkflows(value?: Workflow, index?: number): Workflow;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WorkflowResponse.AsObject;
  static toObject(includeInstance: boolean, msg: WorkflowResponse): WorkflowResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WorkflowResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WorkflowResponse;
  static deserializeBinaryFromReader(message: WorkflowResponse, reader: jspb.BinaryReader): WorkflowResponse;
}

export namespace WorkflowResponse {
  export type AsObject = {
    actionsList: Array<Action.AsObject>,
    workflowsList: Array<Workflow.AsObject>,
  }
}

export class Workflow extends jspb.Message {
  getIdentifier(): string;
  setIdentifier(value: string): void;

  getOn(): string;
  setOn(value: string): void;

  clearResolvesList(): void;
  getResolvesList(): Array<string>;
  setResolvesList(value: Array<string>): void;
  addResolves(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Workflow.AsObject;
  static toObject(includeInstance: boolean, msg: Workflow): Workflow.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Workflow, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Workflow;
  static deserializeBinaryFromReader(message: Workflow, reader: jspb.BinaryReader): Workflow;
}

export namespace Workflow {
  export type AsObject = {
    identifier: string,
    on: string,
    resolvesList: Array<string>,
  }
}

export class Action extends jspb.Message {
  getIdentifier(): string;
  setIdentifier(value: string): void;

  getUses(): string;
  setUses(value: string): void;

  clearRunsList(): void;
  getRunsList(): Array<string>;
  setRunsList(value: Array<string>): void;
  addRuns(value: string, index?: number): string;

  clearArgsList(): void;
  getArgsList(): Array<string>;
  setArgsList(value: Array<string>): void;
  addArgs(value: string, index?: number): string;

  clearNeedsList(): void;
  getNeedsList(): Array<string>;
  setNeedsList(value: Array<string>): void;
  addNeeds(value: string, index?: number): string;

  getEnvMap(): jspb.Map<string, string>;
  clearEnvMap(): void;
  clearSecretsList(): void;
  getSecretsList(): Array<string>;
  setSecretsList(value: Array<string>): void;
  addSecrets(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Action.AsObject;
  static toObject(includeInstance: boolean, msg: Action): Action.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Action, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Action;
  static deserializeBinaryFromReader(message: Action, reader: jspb.BinaryReader): Action;
}

export namespace Action {
  export type AsObject = {
    identifier: string,
    uses: string,
    runsList: Array<string>,
    argsList: Array<string>,
    needsList: Array<string>,
    envMap: Array<[string, string]>,
    secretsList: Array<string>,
  }
}

