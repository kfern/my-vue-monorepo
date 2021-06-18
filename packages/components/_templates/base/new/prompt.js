// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
// https://github.com/jondot/hygen/issues/35#issue-304929297

module.exports = {
  prompt: ({ inquirer, args }) => {
    // defining questions in arrays ensures all questions are asked before next prompt is executed
    const questions = [{
      type: "input",
      name: "name",
      initial: args.name,
      message: "What's name of the component? (ex: test)",
    },
    {
      type: "list",
      name: "statesNames",
      initial: "inactive, active",
      message: "States names? (separated by comma)",
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
            initial:  "CLICK",
            message: `Events names for ${state}? (separated by comma: "CLICK, CLOSE")`,
          })
        })
        return inquirer
          .prompt(questions)
          .then(dataStep1 => Object.assign({}, answers, dataStep1))
          .then(dataStep2 => {
            const questions = []
            dataStep2.statesNames.forEach(state => {
              dataStep2[state].on.forEach(event => {
                questions.push({
                  type: "select",
                  choices: [...dataStep2.statesNames.filter(s => s !== state), "final"],
                  name: `${state}.on.${event}.target`,
                  message: `Select next state when "${state}" and "${event}"`,
                })  
              })
            })
            return inquirer
              .prompt(questions)
              .then(dataStep3 => Object.assign({}, dataStep2, dataStep3))
          })
          .then(final => {
            const states = {}
            for (let index = 0; index < final.statesNames.length; index++) {
              const element = final.statesNames[index];
              states[element] = final[element]
            }
            const result = {
              name: final.name, 
              machine: {
                id: `${final.name.toLowerCase()}Machine`,
                initial: final.statesNames[0],
                context: {},
                states
              }
            }
            return result
          })
      })
  },
}