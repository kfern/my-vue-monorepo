import { createMachine } from 'xstate';
import machine from './definition.json';

const options = {};
export default createMachine(machine, options);
