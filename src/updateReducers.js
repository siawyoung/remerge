
export const objectUpdateReducer = (
  state,
  action
) => ({
  ...state,
  ...action.data
})
