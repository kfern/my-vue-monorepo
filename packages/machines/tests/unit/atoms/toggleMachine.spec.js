import { createMachine } from 'xstate';
import { createModel } from '@xstate/test';

const definition = {
  "id": "toggleMachine",
  "initial": "inactive",
  "context": {},
  "states": {
    "inactive": {
      "on": {
        "CLICK": {
          "target": "active"
        },
      },
      meta: {
        test: async (page) => {          
          console.log('+++++++++++++test.inactive', page)
          // Si no se hace nada o se devuelve una promesa resuelta => todo va bien
          // Si no es correcto hay que devolver una promesa rechazada
          // await Promise.reject({message: 'test.inactive'})

          // Si se devuelve un error el resultado es diferente
          // throw new Error('test.inactive.Erron!');
          // await Promise.resolve()
          // await page.waitFor('input:not(:checked)');
        }
      }
    },
    "active": {
      "on": {
        "CLICK": {
          "target": "inactive"
        },
      },
      meta: {
        test: async (page) => {
          console.log('+++++++++++++test.active', page)
          // Si no se hace nada o se devuelve una promesa resuelta => todo va bien
          // Si no es correcto hay que devolver una promesa rechazada
          // await Promise.reject({message: 'test.active'})
          // await Promise.resolve()
          // await page.waitFor('input:not(:checked)');
        }
      }

    }
  }
};

const options = {};
const testMachine = createMachine(definition, options);
const testModel = createModel(testMachine).withEvents({
  CLICK: {
    exec: async (page) => {
      console.log('click.test.page', page)
      // Si todo va bien no se hace nada => la acción se ha ejecutado
      // Si no es correcto hay que devolver una promesa rechazada
      // return Promise.reject({message: 'Error en click'})
      // Si se produce un error falla el test
      // throw new Error('click.test.Erron!');
      // await page.click('input');
    }
  }
});

describe('toggle', () => {
  const testPlans = testModel.getShortestPathPlans();

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(path.description, async () => {
          // do any setup, then...
          const page = {data: true};
          await path.test(page);
        });
      });
    });
  });

  it('should have full coverage', () => {
    return testModel.testCoverage();
  });
});

/*
describe('testMachine', () => {
  it('initialState', () => {
    const expectedState = definition.initial; // the expected state value
    const actualState = testMachine.initialState.value;
    expect(actualState).toBe(expectedState);
  });
});
*/