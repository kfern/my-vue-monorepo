import { assign } from 'xstate';

// Action to increment the context amount
const addWater = assign({
  amount: (context, event) => context.amount + 1
});

// Guard to check if the glass is full
const glassIsFull = (context, event) => {
  const result = context.amount >= context.limit;
  return result;
}

export const options = {
  actions: { addWater },
  guards: { glassIsFull }
};
