
// both arrays and objects can be updated the same way
export const updateReducer = (
  state,
  action
) => ({
  ...state,
  ...action.data
})
