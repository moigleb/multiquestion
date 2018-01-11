export const CHANGE_FULL_NAME = "CHANGE_FULL_NAME";
export const GO_TO_MY_URL = "GO_TO_MY_URL";
export const SET_URL = "SET_URL";
export const SET_PROFESSION = "SET_PROFESSION";
export const FILTER_PROFESSION_LIST = "FILTER_PROFESSION_LIST";
export const CLOSE_VISUAL_ONBOARDING = "CLOSE_VISUAL_ONBOARDING";
export const CHOOSE_VISITOR_KIND = "CHOOSE_VISITOR_KIND";

export const changeFullName = name => {
  return {
    type: CHANGE_FULL_NAME,
    value: name
  };
};

export const goToMyURL = () => {
  return {
    type: GO_TO_MY_URL
  };
};

export const setURL = myURL => {
  return {
    type: SET_URL,
    myURL
  };
};

export const setProfession = profession => {
  return {
    type: SET_PROFESSION,
    profession
  };
};

export const filterListProfession = filterList => {
  return {
    type: FILTER_PROFESSION_LIST,
    filterList
  };
};

export const closeVisualOnboarding = () => {
  return {
    type: CLOSE_VISUAL_ONBOARDING
  };
};

export const chooseVisitorKind = visitorKind => {
  return {
    type: CHOOSE_VISITOR_KIND,
    visitorKind
  };
};
