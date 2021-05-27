import { createMachine } from 'xstate';
import machine from './definition.json';
import { options } from './options';

export const glassMachine = createMachine(machine, options);
