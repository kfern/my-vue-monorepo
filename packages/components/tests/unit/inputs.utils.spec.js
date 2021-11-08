const assert = require("assert");

const {
  getGeneralQuestions,
  getEventsQuestions,
  getTargetsQuestions,
  getTransitionsByState,
} = require("../../lib/inputs.utils");
const testMachine = require("../../src/ToggleWithClose/ToggleWithClose.machine.json");

describe("inputs.utils", () => {
  it("getGeneralQuestions without options: component and states names", async () => {
    // Act
    const actual = getGeneralQuestions();
    // Assert
    const expected = {
      type: ["input", "list"],
      name: ["name", "states"],
      initial: ["test", "inactive, active"],
    };
    assert.deepStrictEqual(
      actual.map((q) => q.type),
      expected.type,
      "input types"
    );
    assert.deepStrictEqual(
      actual.map((q) => q.name),
      expected.name,
      "input names"
    );
    assert.deepStrictEqual(
      actual.map((q) => q.initial),
      expected.initial,
      "default values"
    );
    // states to lowercase
    const fakeInput = ["UPPERCASE", "CamelCase"];
    const transform = actual
      .filter((q) => q.name === "states")[0]
      .result(fakeInput);
    assert.deepStrictEqual(
      transform,
      fakeInput.map((i) => i.toLowerCase()),
      "inputs to lowercase"
    );
  });

  it("getGeneralQuestions with options: component and states names", async () => {
    // Act
    const options = {
      name: "fakeName",
      states: "state1, state2",
    };
    const actual = getGeneralQuestions(options);
    // Assert
    const expected = {
      type: ["input", "list"],
      name: ["name", "states"],
      initial: [options.name, options.states],
    };
    assert.deepStrictEqual(
      actual.map((q) => q.type),
      expected.type,
      "input types"
    );
    assert.deepStrictEqual(
      actual.map((q) => q.name),
      expected.name,
      "input names"
    );
    assert.deepStrictEqual(
      actual.map((q) => q.initial),
      expected.initial,
      "default values"
    );
    // states to lowercase
    const fakeInput = ["UPPERCASE", "CamelCase"];
    const transform = actual
      .filter((q) => q.name === "states")[0]
      .result(fakeInput);
    assert.deepStrictEqual(
      transform,
      fakeInput.map((i) => i.toLowerCase()),
      "inputs to lowercase"
    );
  });

  it("getEventsQuestions without options: Events by state", async () => {
    // Act
    const states = ["state1", "state2"];
    const actual = getEventsQuestions(states);

    // Assert
    const expected = {
      type: ["list", "list"],
      name: ["state1.on", "state2.on"],
      initial: ["CLICK", "CLICK"],
    };
    assert.deepStrictEqual(
      actual.map((q) => q.type),
      expected.type,
      "input types"
    );
    assert.deepStrictEqual(
      actual.map((q) => q.name),
      expected.name,
      "input names"
    );
    assert.deepStrictEqual(
      actual.map((q) => q.initial),
      expected.initial,
      "default values"
    );
    // response to uppercase
    const fakeInput = ["lowercase", "CamelCase"];
    const transform = actual
      .filter((q) => q.name === expected.name[0])[0]
      .result(fakeInput);
    assert.deepStrictEqual(
      transform,
      fakeInput.map((i) => i.toUpperCase()),
      "inputs to uppercase"
    );
  });

  it("getEventsQuestions with options: Events by state", async () => {
    // Act
    const states = ["state1", "state2"];
    const options = {
      "state1.on": "PING, PONG",
    };
    const actual = getEventsQuestions(states, options);

    // Assert
    const expected = {
      type: ["list", "list"],
      name: ["state1.on", "state2.on"],
      initial: [options["state1.on"], "CLICK"],
    };
    assert.deepStrictEqual(
      actual.map((q) => q.type),
      expected.type,
      "input types"
    );
    assert.deepStrictEqual(
      actual.map((q) => q.name),
      expected.name,
      "input names"
    );
    assert.deepStrictEqual(
      actual.map((q) => q.initial),
      expected.initial,
      "default values"
    );
    // response to uppercase
    const fakeInput = ["lowercase", "CamelCase"];
    const transform = actual
      .filter((q) => q.name === expected.name[0])[0]
      .result(fakeInput);
    assert.deepStrictEqual(
      transform,
      fakeInput.map((i) => i.toUpperCase()),
      "inputs to uppercase"
    );
  });

  it("getTargetsQuestions without options: Target by state and event", async () => {
    // Act
    const statesWithEvents = {
      inactive: { on: ["CLICK"] },
      active: { on: ["CLICK", "CLOSE"] },
      closed: { on: ["OPEN"] },
    };
    const actual = getTargetsQuestions(statesWithEvents);

    // Assert
    const expected = {
      type: ["select", "select", "select", "select"],
      name: [
        "inactive.on.CLICK.target",
        "active.on.CLICK.target",
        "active.on.CLOSE.target",
        "closed.on.OPEN.target",
      ],
    };
    assert.deepStrictEqual(
      actual.map((q) => q.type),
      expected.type,
      "input types"
    );
    assert.deepStrictEqual(
      actual.map((q) => q.name),
      expected.name,
      "input names"
    );
  });

  it("getTransitionsByState", async () => {
    // Act
    const actual = getTransitionsByState(testMachine);

    // Assert
    const expected = [
      {
        state: "inactive",
        events: [{ state: "inactive", event: "CLICK", target: "active" }],
      },
      {
        state: "active",
        events: [
          { state: "active", event: "CLICK", target: "inactive" },
          { state: "active", event: "CLOSE", target: "closed" },
        ],
      },
      {
        state: "closed",
        events: [{ state: "closed", event: "OPEN", target: "active" }],
      },
    ];

    assert.deepStrictEqual(actual, expected, "transitions");
  });
});
