// https://codesandbox.io/s/3qlmw4m4rq?file=/src/machine.test.js
import { interpret } from "xstate";
import { SimulatedClock } from 'xstate/lib/SimulatedClock'; // >= 4.6.0
import { screenSaverMachine } from '../../../src/atoms/screenSaverMachine'

/*
// Screensaver test, with real values
const SCREENSAVER_DELAY_MS = 90000;
const SCREENSAVER_ACTIVE_TIME_MS = 5 * 60000;
const SCREENSAVER_INACTIVE_TIME_MS = 60000;

const machine = Machine({
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
});
*/

describe("ScreenSaver machine", () => {
  let service;

  beforeEach(() => {
    service = interpret(screenSaverMachine, {
      clock: new SimulatedClock()
    });
    service.start();
  });

  afterEach(() => {
    service.stop();
  });

  it("The Screensaver should be opened at first", () => {
    expect(service.state.matches("active")).toEqual(true);
  });

  it("When the user touches the Screensaver it should disappear", () => {
    service.send("AnyActivity");
    expect(service.state.matches("inactive")).toEqual(true);
  });

  it("Once disappeared, and if the user doesn’t interact with the app in 90 seconds, it should appear again", () => {
    service.send("AnyActivity");
    service.clock.increment(90000);
    expect(service.state.matches("active")).toEqual(true);
  });

  it("Once disappeared, it should appear again after 90 seconds of the last user interaction", () => {
    service.send("AnyActivity");
    service.clock.increment(30000);
    service.send("AnyActivity"); // last interaction
    service.clock.increment(90000);
    expect(service.state.matches("active")).toEqual(true);
  });

  it(" While the Screensaver is shown 5 minutes and hidden 1 minute until the user interacts with the app", () => {
    expect(service.state.matches("active.visible")).toEqual(true);
    service.clock.increment(5 * 60000);
    expect(service.state.matches("active.hidden")).toEqual(true);
    service.clock.increment(60000);
    expect(service.state.matches("active.visible")).toEqual(true);
    service.clock.increment(5 * 60000);
    expect(service.state.matches("active.hidden")).toEqual(true);
    service.clock.increment(60000);
    expect(service.state.matches("active.visible")).toEqual(true);
    service.send("AnyActivity");
    expect(service.state.matches("inactive")).toEqual(true);
  });
});
