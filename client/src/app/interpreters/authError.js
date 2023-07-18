import { isRejectedWithValue } from '@reduxjs/toolkit';

export const rtkQueryErrorLogger = (api) =>(store)=> (next) => (action) => {
 if (isRejectedWithValue(action)) {
    console.log("HERE");
  }

  return next(action);
};
