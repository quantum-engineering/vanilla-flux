/**
 * PerformanceAppDispatcher.js
 * @flow
 */

"use strict";

import type {Action} from "../actions/PerformanceUserActions";

import {Dispatcher} from "flux"

const instance: Dispatcher<Action> = new Dispatcher();
export default instance;

// So we can conveniently do, `import {dispatch} from './PerformanceAppDispatcher'`
export const dispatch = instance.dispatch.bind(instance);
