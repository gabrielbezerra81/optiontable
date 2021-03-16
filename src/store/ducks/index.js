import { combineReducers } from "redux";

import { reducer as options } from "./optionsDuck";

export { OptionsTypes, optionsActions } from "./optionsDuck";

export default combineReducers({
  options
});
