const apiTypes = (key) => {
  return {
    START: `${key}`,
    SUCCESS: `${key}_SUCCESS`,
    FAIL: `${key}_FAIL`
  };
};

// auth action types
export const AUTH = apiTypes('AUTH');