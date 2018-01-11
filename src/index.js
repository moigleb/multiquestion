import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "format-modules/visual-multi-question/src/reducers";
import RootComponent from "format-modules/visual-multi-question/src/components";
import { CLOSE_VISUAL_ONBOARDING } from "format-modules/visual-multi-question/src/actions";


const appIntegrationMiddleware = store => next => action => {
  next(action);
  let state = store.getState();
  if (action.type == CLOSE_VISUAL_ONBOARDING) {
    switch (state.visitorKind) {
      case "random visit":
        $("#signup_form").append(`<input type="hidden" name="user[name]" value="${state.fullName}" />`);
        $("#signup_form").append('<input type="hidden" name="visitor_purpose" value="random visit" />');
        break;
      case "first portfolio":
        $("#signup_form").append(`<input type="hidden" name="user[name]" value="${state.fullName}" />`);
        $("#signup_form").append(`<input type="hidden" name="user[profession]" value="${state.profession}" />`);
        $("#signup_form").append('<input type="hidden" name="visitor_purpose" value="first portfolio" />');
        break;
      case "existing portfolio":
        $("#signup_form").append(`<input type="hidden" name="user[name]" value="${state.fullName}" />`);
        $("#signup_form").append(`<input type="hidden" name="user[profession]" value="${state.profession}" />`);
        $("#signup_form").append(`<input type="hidden" name="visitor_portfolio_url" value="${state.myURL}" />`);
        $("#signup_form").append('<input type="hidden" name="visitor_purpose" value="existing portfolio" />');
        break;
    }
  }
};

const MultiQuestionOnboardingApp = (props, railsContext) => {
  let store = createStore(reducer, applyMiddleware(appIntegrationMiddleware));

  return (
    <Provider store={store}>
      <RootComponent {...props} />
    </Provider>
  );
};

export default MultiQuestionOnboardingApp;
