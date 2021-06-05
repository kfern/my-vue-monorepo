// https://codesandbox.io/s/3qlmw4m4rq?file=/src/machine.test.js
import { createMachine } from "xstate";

// Screensaver test, with real values
const SCREENSAVER_DELAY_MS = 90000;
const SCREENSAVER_ACTIVE_TIME_MS = 5 * 60000;
const SCREENSAVER_INACTIVE_TIME_MS = 60000;

const machine = {
  initial: "active",
  states: {
    active: {
      initial: "visible",
      on: { AnyActivity: "inactive" },
      states: {
        visible: { after: { [SCREENSAVER_ACTIVE_TIME_MS]: "hidden" } },
        hidden: { after: { [SCREENSAVER_INACTIVE_TIME_MS]: "visible" } }
      }
    },
    inactive: {
      on: { AnyActivity: "inactive" },
      after: {
        [SCREENSAVER_DELAY_MS]: "active"
      }
    }
  }
};

export const screenSaverMachine = createMachine(machine);
