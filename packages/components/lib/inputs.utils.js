const lodash = require("lodash");

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

/**
 * Get user inputs and preprocess before hygen generate 
 * @param {*} inquirer 
 * @param {*} args 
 */
const getInputs = async (inquirer, args) => {
  const general = await inquirer.prompt(getGeneralQuestions(args))
  const statesWithEvents = await inquirer.prompt(getEventsQuestions(general.states, args))
  const states  = await inquirer.prompt(getTargetsQuestions(statesWithEvents));
  const transitions = getTransitionsByState({...general, states});
  const eventsNames = Object.values(transitions)
    .map((s) => s.events.map(e => e.event))
    .reduce((a, b) => a.concat(b), [])
    .filter(onlyUnique);

  // @todo better?
  const statesWithFinal = JSON.parse(JSON.stringify(states).replace(/"target":"final"/gm, '"type":"final"'));

  const result = {
    name: general.name,
    machine: {
      id: `${general.name.toLowerCase()}-machine`,
      initial: general.states[0],
      context: {},
      states: statesWithFinal
    },
    transitions,
    statesNames: general.states,
    eventsNames
  };
  return result;
}

/**
 * 
 * @param {object} args Default values. Optional. One key by question 
 * @returns {array}     Questions 
*/
const getGeneralQuestions = args => {
  const questions = [{
    type: "input",
    name: "name",
    initial: args && args.name ? args.name : 'test',
    message: "What's name of the component? (ex: test)",
  },
  {
    type: "list",
    name: "states",
    initial: args && args.states ? args.states : "inactive, active",
    message: "States names? (separated by comma)",
    result: (states) => states.map(s => s.toLowerCase())
  }];
  return questions;
}

/**
 * @param {array} states 
 * @param {*} args
 * @returns {array}     Questions  
 */
const getEventsQuestions = (states, args) => {
  const questions = []
  states.forEach(state => {
    const initial = lodash.get(args, `${state}.on`);
    questions.push({
      type: "list",
      name: state + ".on",
      initial: initial ? initial : 'CLICK',
      message: `Events names for ${state} state? (separated by comma: "CLICK, CLOSE")`,
      result: (events) => events.map(e => e.toUpperCase())
    })
  });
  return questions;
}

/**
 * 
 * @param {*} statesWithEvents
 * @returns {array}     Questions  
 */
const getTargetsQuestions = (statesWithEvents) => {
  const states = Object.keys(statesWithEvents);
  const questions = [];
  states.forEach(state => {
    statesWithEvents[state].on.forEach(event => {
      questions.push({
        type: "select",
        choices: [...states.filter(s => s !== state), "final"],
        name: `${state}.on.${event}.target`,
        message: `Select next state when "${state}" and "${event}"`,
      })
    })
  });
  return questions;
}

/**
 * 
 * @param {object} machineJSON
 * @returns {object} Transitions by state  
 */
const getTransitionsByState = machineJSON => {
  const result = [];
  const states = Object.keys(machineJSON.states);
  states.forEach(state => {
    const events = Object.keys(machineJSON.states[state].on).map(event => {
      return { state, event, target: machineJSON.states[state].on[event].target};
    })
    const r = {
      state,
      events: events
    };
    result.push(r);
  })
  return result;
};

module.exports = {
  getInputs,
  getGeneralQuestions,
  getEventsQuestions,
  getTargetsQuestions,
  getTransitionsByState
}