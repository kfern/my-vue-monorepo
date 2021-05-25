import { glassMachine } from '../../../src/atoms/glassMachine';

describe('glassMachine', () => {
  it('initialState is "empty"', () => {
    const expectedState = 'empty'; // the expected state value
    const actualState = glassMachine.initialState.value;
    expect(actualState).toBe(expectedState);
  });

  it('should reach "filling" given "empty" when the "FILL" event occurs', () => {
    const expectedState = 'filling'; // the expected state value
    const actualState = glassMachine.transition(glassMachine.initialState, {
      type: 'FILL'
    });
    expect(actualState.value).toBe(expectedState);
    expect(actualState.context.amount).toBe(1);
  });

  it('should reach "full" given "filling" when amount is in the limit', () => {
    const limit = 20;
    const expectedState = 'full'; // the expected state value
    const testMachine = glassMachine.withContext({amount: limit - 1, limit});

    let actualState = testMachine.transition('filling', { type: 'FILL' });
    actualState = testMachine.transition(actualState, { type: 'FILL' });

    expect(actualState.value).toBe(expectedState);
    expect(actualState.context.amount).toBe(limit);
  });
  
});

