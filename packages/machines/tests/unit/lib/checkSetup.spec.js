import { checkSetup } from '../../../src/lib/setup';

describe('checkSetup', () => {
  it('should return array of errors when event data is not valid', async () => {
    const expectedValue = [{id: 'data.missing'}];
    const fake = {
      context: {},
      event: {}
    }
    try {
      await checkSetup(fake.context, fake.event);
    } catch (error) {
      expect(error).toStrictEqual(expectedValue);
    }
  });

  it('should resolve with data when event data is valid', async () => {
    const fake = {
      context: {},
      event: { data: ['Text line']}
    }
    const actualValue = await checkSetup(fake.context, fake.event);
    expect(actualValue).toStrictEqual(fake.event.data);
  });
});
