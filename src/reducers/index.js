import {
  CHANGE_FULL_NAME,
  NEXT_STEP,
  GO_TO_MY_URL,
  SET_URL,
  SET_PROFESSION,
  FILTER_PROFESSION_LIST,
  CHOOSE_VISITOR_KIND,
  CLOSE_VISUAL_ONBOARDING
} from "format-modules/visual-multi-question/src/actions";
import assign from "lodash/assign";

const defaultState = {
  enabled: true,
  step: 1,
  fullName: "",
  goToMyURL: false,
  myURL: "",
  profession: "",
  filterProfessionList: [],
  visitorKind: null
};

const reducer = (state, action) => {
  state = state || defaultState;
  switch (action.type) {
    case CHANGE_FULL_NAME:
      return assign({}, state, { fullName: action.value });
    case NEXT_STEP:
      return assign({}, state, { step: state.step + 1 });
    case GO_TO_MY_URL:
      return assign({}, state, { MyURL: "", goToMyURL: !state.goToMyURL });
    case SET_URL:
      return assign({}, state, { myURL: action.myURL });
    case SET_PROFESSION:
      return assign({}, state, { profession: action.profession });
    case FILTER_PROFESSION_LIST:
      return assign({}, state, { filterProfessionList: action.filterList });
    case CHOOSE_VISITOR_KIND:
      return assign({}, state, { visitorKind: action.visitorKind });
    case CLOSE_VISUAL_ONBOARDING:
      return assign({}, state, { enabled: false });
    default:
      return state;
  }
};

export default reducer;
