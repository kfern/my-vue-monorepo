import { createMachine, assign } from 'xstate';
import { checkSetup } from '../../../src/lib/setup';

const machine = {
  id: 'setup',
  initial: 'idle',
  context: {
    errors: [],
    data: []
  },
  states: {
    idle: {
      on: {
        'SETUP' : { target: 'checks'}
      }
    },
    checks: {
      invoke: {
        id: 'checkSetup',
        src: (context, event) => checkSetup(context, event),
        onDone: {
          target: 'success',
          actions: 'setData'
        },
        onError: {
          target: 'failure',
          actions: 'setErrors'
        }
      }
    },
    success: { type: 'final'},
    failure: {type: 'final'}
  }
};

const options = {
  actions: {
    setData: assign({ data: (_context, event) => event.data }),
    setErrors: assign({ errors: (_context, event) => event.data })
  }
};
export default createMachine(machine, options);
