/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeMessage
// ====================================================

export interface seeMessage_seeMessage {
  __typename: "Message";
  id: number;
  payload: string;
}

export interface seeMessage {
  seeMessage: (seeMessage_seeMessage | null)[] | null;
}
