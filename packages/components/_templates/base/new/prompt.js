// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
// https://github.com/jondot/hygen/issues/35#issue-304929297

const getGeneral = (enquirer, args) => {
  const questions = [{
    type: "input",
    name: "name",
    initial: args.name ? args.name : 'test',
    message: "What's name of the component? (ex: test)",
  },
  {
    type: "list",
    name: "states",
    initial: "inactive, active",
    message: "States names? (separated by comma)",
    result: (states) => states.map(s => s.toLowerCase())
  }];
  return enquirer.prompt(questions);
}

const getEvents = (enquirer, states) => {
  const questions = []
  states.forEach(state => {
    questions.push({
      type: "list",
      name: state + ".on",
      initial: "CLICK",
      message: `Events names for ${state} state? (separated by comma: "CLICK, CLOSE")`,
      result: (events) => events.map(e => e.toUpperCase())
    })
  })
  return enquirer.prompt(questions);
}

const getTargets = async (enquirer, statesWithEvents) => {
  const states = Object.keys(statesWithEvents);
  const questions = [];
  const transitions = {};
  states.forEach(state => {
    statesWithEvents[state].on.forEach(event => {
      questions.push({
        type: "select",
        choices: [...states.filter(s => s !== state), "final"],
        name: `${state}.on.${event}.target`,
        message: `Select next state when "${state}" and "${event}"`,
        result: (newState) => {
          if (!(transitions[state] && transitions[state].events)) transitions[state] = { events: [] };
          transitions[state].events.push({ state, event, target: newState })
          return newState
        }
      })
    })
  });
  const result = await enquirer.prompt(questions);
  return Promise.resolve({ states: result, transitions });
}

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const getInputs = async (inquirer, args) => {
  const general = await getGeneral(inquirer, args);
  const statesWithEvents = await getEvents(inquirer, general.states);
  const final = await getTargets(inquirer, statesWithEvents);

  const eventsNames = Object.values(final.transitions)
    .map((s) => s.events.map(e => e.event))
    .reduce((a, b) => a.concat(b), [])
    .filter(onlyUnique);

  // @todo better?
  const states = JSON.parse(JSON.stringify(final.states).replace(/"target":"final"/gm, '"type":"final"'));

  const result = {
    name: general.name,
    machine: {
      id: `${general.name.toLowerCase()}-machine`,
      initial: general.states[0],
      context: {},
      states
    },
    transitions: general.states.map(s => Object.assign({}, { state: s, events: final.transitions[s].events })),
    statesNames: general.states,
    eventsNames
  };
  // console.log(JSON.stringify(result, null, 2))
  return result;
}

module.exports = {
  prompt: ({ inquirer, args }) => {
    return getInputs(inquirer, args)
  },
};
