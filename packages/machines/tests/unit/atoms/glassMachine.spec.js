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
    expect(actualState.context).toStrictEqual({ amount: 1});
  });

  it('should reach "full" given "empty" when the "FILL" event occurs multiple times', () => {
    const limit = 10;
    const expectedState = 'full'; // the expected state value
    let actualState = glassMachine.transition(glassMachine.initialState, {
      type: 'FILL'
    });
    for (let index = 0; index < limit + 3; index++) {// More times than limit
      actualState = glassMachine.transition(actualState, {
        type: 'FILL'
      });      
    }
    expect(actualState.value).toBe(expectedState);
    expect(actualState.context).toStrictEqual({ amount: limit});
  });
  
});

