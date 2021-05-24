import promiseMachine from '../../../src/atoms/promiseMachine';

describe('promiseMachine', () => {
  it('should reach "resolved" given "pending" when the "RESOLVE" event occurs', () => {
    const expectedValue = 'resolved'; // the expected state value
    const actualState = promiseMachine.transition('pending', { type: 'RESOLVE' });
    expect(actualState.matches(expectedValue)).toBe(true)
  });

});
