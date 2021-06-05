
export const checkSetup = (_context, event) => {
  if (event && event.data && event.data.length > 0){
    return Promise.resolve(event.data);
  } else {
    const errors = [
      { id: 'data.missing' }
    ];
    return Promise.reject(errors);
  }
};