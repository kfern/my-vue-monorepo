// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
// https://github.com/jondot/hygen/issues/35#issue-304929297

module.exports = {
  prompt: ({ inquirer, args }) => {
    // defining questions in arrays ensures all questions are asked before next prompt is executed
    const questions = [{
      type: "input",
      name: "name",
      initial: args.name ? args.name : 'test',
      message: "What's name of the component? (ex: test)",
    },
    {
      type: "list",
      name: "statesNames",
      initial: "inactive, active",
      message: "States names? (separated by comma)",
      result: (states) => states.map(s => s.toLowerCase())
    }]

    return inquirer
      .prompt(questions)
      .then(answers => {
        const { statesNames } = answers
        const questions = []
        statesNames.forEach(state => {
          questions.push({
            type: "list",
            name: state + ".on",
            initial: "CLICK",
            message: `Events names for ${state} state? (separated by comma: "CLICK, CLOSE")`,
            result: (events) => events.map(e => e.toUpperCase())
          })
        })
        return inquirer
          .prompt(questions)
          .then(dataStep1 => Object.assign({}, answers, dataStep1))
          .then(dataStep2 => {
            const questions = []
            const transitions = []
            dataStep2.statesNames.forEach(state => {
              dataStep2[state].on.forEach(event => {
                questions.push({
                  type: "select",
                  choices: [...dataStep2.statesNames.filter(s => s !== state), "final"],
                  name: `${state}.on.${event}.target`,
                  message: `Select next state when "${state}" and "${event}"`,
                  result: (newState) => {
                    transitions.push({ state, event, target: newState })
                    return newState
                  }
                })
              })
            })
            return inquirer
              .prompt(questions)
              .then(dataStep3 => Object.assign({}, dataStep2, dataStep3, { transitions }))
          })
          .then(final => {
            const states = {}
            for (let index = 0; index < final.statesNames.length; index++) {
              const element = final.statesNames[index];
              states[element] = final[element]
            }
            const eventsNames = final.transitions.map(t => t.event).filter((value, index, self) => self.indexOf(value) === index)

            const transitions = final.statesNames.map(state => {
              return {state, events: final.transitions.filter(t => t.state === state)}
            })
            
            const result = {
              name: final.name,
              machine: {
                id: `${final.name.toLowerCase()}Machine`,
                initial: final.statesNames[0],
                context: {},
                states
              },
              transitions,
              statesNames,
              eventsNames
            };
            return result
          })
      })
  },
}