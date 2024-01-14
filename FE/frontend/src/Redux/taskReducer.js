import { TASK_FAILURE, TASK_REQUEST, TASK_SUCCESS } from "./actionTypes";


const init = {
  isLoading: false,
  isError: false,
  tasks: [],
};
export const taskReducer = (state = init, { type, payload }) => {
  switch (type) {
    case TASK_REQUEST: {
      return { ...state, isLoading: true };
    }

    case TASK_SUCCESS: {
      return { ...state, isLoading: false, tasks: payload };
    }

    case TASK_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }

    default: {
      return state;
    }
  }
};
