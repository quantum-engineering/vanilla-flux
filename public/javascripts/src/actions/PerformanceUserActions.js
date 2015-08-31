/**
 * PerformanceUserActions.js
 * @flow
 */

"use strict";

export type Action =
{
  type: "user/load",
  id: string,
  avatar: string,
  email: string,
  name: string
} |
{
  type: "user/create",
  id: string,
  avatar: string,
  email: string,
  name: string
};
