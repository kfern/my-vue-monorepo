import { interpret } from "xstate";
import setupMachine from '../../../src/atoms/setupMachine';

describe('setupMachine', () => {
  let service;

  beforeEach(() => {
    service = interpret(setupMachine);
    service.start();
  });

  afterEach(() => {
    service.stop();
  });

  it('initialState is "idle"', () => {
    const expectedState = 'idle'; // the expected state value
    expect(service.state.matches(expectedState)).toBe(true);
  });

  it('should reach "failure" given "idle" without data', async () => {
    const expectedState = 'failure'; // the expected state value
    const expectedErrors = [ {id: 'data.missing'} ];
    await service.send('SETUP');
    expect(service.state.matches(expectedState)).toBe(true);
    expect(service.state.context.errors.length).toBe(1);
    expect(service.state.context.errors).toStrictEqual(expectedErrors);
  });

  it('should reach "success" given "idle" with data', async () => {
    const expectedState = 'success'; // the expected state value
    const testData = { data: ['line one'] };
    await service.send('SETUP', testData);
    expect(service.state.matches(expectedState)).toBe(true);
    expect(service.state.context.data).toStrictEqual(testData.data)
  });  
});
