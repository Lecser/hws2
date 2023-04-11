const initState = {
  themeId: 1,
};
type IS = typeof initState;
export const themeReducer = (
  state = initState,
  action: changeThemeIdACType
): IS => {
  // fix any
  switch (action.type) {
    // дописать
    case "SET_THEME_ID": {
      return { ...state, themeId: action.id };
    }
    default:
      return state;
  }
};

type changeThemeIdACType = { type: "SET_THEME_ID"; id: number };
export const changeThemeId = (id: number): changeThemeIdACType => ({
  type: "SET_THEME_ID",
  id,
}); // fix any
