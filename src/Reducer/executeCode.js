export const executeCode = (compiled = {}, action) => {
  switch (action.type) {
    case "EXECUTE_PROGRAM_REQUEST":
      return { waiting: true };
    case "EXECUTE_PROGRAM_REQUEST_SUCCESS":
      return { waiting: false, compiled: action.payload };
    default:
      return compiled;
  }
};
