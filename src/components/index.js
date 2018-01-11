import React, { Component } from "react";
import classnames from "classnames";
import {
  changeFullName,
  goToMyURL,
  setURL,
  chooseVisitorKind,
  closeVisualOnboarding,
  setProfession,
  filterListProfession,
} from "format-modules/visual-multi-question/src/actions";
import { connect } from "react-redux";

class RootComponent extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleProfessionChange = this.handleProfessionChange.bind(this);
    this.handleURL = this.handleURL.bind(this);
    this.onVisualOnboardingEnd = this.onVisualOnboardingEnd.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.state = {
      isUrlForm: false,
      inputValue: "",
      showDropdown: false
    };
  }

  handleChange(e) {
    let fullName = e.target.value;
    this.props.dispatch(changeFullName(fullName));
    if(e.target.value === "") {
      this.setState({
        showDropdown: false
      });
    }
  }

  handleURL(e) {
    let url = e.target.value;
    this.props.dispatch(setURL(url));
  }

  handleRandomVisitorClick() {
    this.props.dispatch(chooseVisitorKind("random visit"));
  }

  handleFirstPortfolioClick(e) {
    this.props.dispatch(chooseVisitorKind("first portfolio"));
  }

  handleExistingPortfolioClick(e) {
    this.props.dispatch(chooseVisitorKind("existing portfolio"));
    this.props.dispatch(goToMyURL());
  }

  handleProfessionChange(event) {
    let prof = event.target.value;
    let professionList = this.props.professionList;
    let professionsArrayForRender = professionList.filter(profession => {
      profession = profession.toLowerCase();
      return profession.indexOf(prof.toLowerCase()) > -1;
    });
    if (prof.length > 0 && professionsArrayForRender.length > 0) {
      document.addEventListener('click', this.handleOutsideClick, false);
      this.props.dispatch(filterListProfession(professionsArrayForRender));

      this.setState({
        inputValue: prof,
        showDropdown: true
      });
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
      this.props.dispatch(filterListProfession(professionsArrayForRender));

      this.setState({
        inputValue: prof,
        showDropdown: false
      });
    }
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    } else {
      this.setState({
        showDropdown: false
      });
    }
  }

  handleOptionClick(profession) {
    this.setState({
      inputValue: profession,
      showDropdown: false
    });
    this.props.dispatch(setProfession(profession));
    $("#inputline3").focus();
  }

  renderSearchProfession() {
    let {filterProfessionList} = this.props;
    if (filterProfessionList && filterProfessionList.length > 0) {
      return filterProfessionList.map((profession, i) => {
        return (
          <li
            onClick={this.handleOptionClick.bind(this, profession)}
            key={i}
            className="option"
            id={`option${i}`}
          >
            {profession}
          </li>
        );
      });
    }
  }

  onVisualOnboardingEnd() {
    this.props.dispatch(closeVisualOnboarding());
  }

  componentDidMount() {
    if (this.props.isExperimentStarted) {
      formatAnalytics.track("G006 Onboarding Seen", { step: "Name" });
    }
    removeEvents();
    prepareAnimationData(this.onVisualOnboardingEnd);
  }

  render() {
    let enabled = classnames({ "active": this.props.fullName && this.props.fullName.length > 0 });
    let enabled2 = classnames({ "active": this.props.myURL && this.props.myURL.length > 0 });
    let enabled3 = classnames({ "active": this.state.inputValue.length > 0 });


    return <div>
      <div id="main">
        <div id="step1">01 – Your Name</div>

        <div id="textfield">
          <div className="main-wrap">
            <span id="main-wipe"></span>
            <p id="hey">What is your name?</p>
          </div>
          <form id="q1-form">
            <div id="main-wipe-2"></div>
            <div className="input-wrap">
              <input id="inputline"
                     type="text"
                     placeholder="Hey! I'm..."
                     value={this.props.fullName}
                     autoComplete="off"
                     onChange={this.handleChange} />
              <p id="arrow" className={enabled}>&#x2192;</p>
            </div>
          </form>
        </div>
      </div>

      <div id="main2">
        <div id="step2">02 - Why Format</div>
        <div id="wrap-step2">
          <div>
            <div id="a0" className="a">
              <div className="wipe-wrap-option">

                <div id="step-link-0" className="step-link" onClick={this.handleFirstPortfolioClick.bind(this)}>

                  <span className="step-link-bg">
                    <div className="main2-wipe"></div>

                    <span className="step-link-text">I want to build my first
                      <span className="arrow-wrap"> portfolio<span className="step-link-arrow">&#x2192;</span></span>
                    </span>
                  </span>

                  <div className="step-link-wipe" />

                  <span className="step-link-text">I want to build my first
                    <span className="arrow-wrap"> portfolio<span className="step-link-arrow">&#x2192;</span></span>
                  </span>
                </div>
              </div>
            </div>
            <div id="a1" className="a" onClick={this.handleExistingPortfolioClick.bind(this)}>
              <div className="wipe-wrap-option">

                <div id="step-link-1" className="step-link">


                  <span className="step-link-bg">
                    <div className="main2-wipe"></div>

                    <span className="step-link-text">I want to replace my existing
                      <span className="arrow-wrap"> portfolio<span className="step-link-arrow">&#x2192;</span></span>
                    </span>
                  </span>

                  <div className="step-link-wipe" />

                  <span className="step-link-text">I want to replace my existing
                    <span className="arrow-wrap"> portfolio<span className="step-link-arrow">&#x2192;</span></span>
                  </span>
                </div>
              </div>
            </div>
            <div id="a2" className="a">
              <div className="wipe-wrap-option">

                <div id="step-link-2" className="step-link">

                  <span className="step-link-bg">
                    <div className="main2-wipe"></div>

                    <span className="step-link-text">I'm just
                      <span className="arrow-wrap"> looking<span className="step-link-arrow">&#x2192;</span></span>
                    </span>
                  </span>

                  <div className="step-link-wipe" />

                  <span className="step-link-text">I'm just
                    <span className="arrow-wrap"> looking<span className="step-link-arrow">&#x2192;</span></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="main2-URL">
        <div id="step2">02 - Why Format</div>
        <div id="textfieldURL">
          <div className="textfieldURL-wrap">
            <div id="back-button"
                 onClick={() => {
                   this.setState({isUrlForm: false});
                   this.props.dispatch(goToMyURL());
                 }}>
              &lt;</div>
            <div id="main2-URL-wipe"></div>
            <div id="hey2">
              <span id="hey2-q">
                <div id="URL-wipe"></div>
                My portfolio URL is
              </span>
            </div>
            <form id="q2-form">
              <div className="input-wrap">
                <div id="inputline2-wipe"></div>
                <input id="inputline2"
                       type="text"
                       autoComplete="off"
                       placeholder="worldwideweb.com"
                       value={this.props.myURL}
                       onChange={this.handleURL}/>

                <p id="arrowURL"
                   className={enabled2}
                >&#x2192;</p>
              </div>

              <div id="skip">Skip</div>
            </form>
          </div>
        </div>
      </div>

      <div id="main3">
        <div id="step3">03 - Your Profession</div>

        <div id="textfield3">
          <div className="main-wrap">
            <div id="main-wipe3"></div>
            <p id="hey3">What do you do?</p>
          </div>
          <form id="q3-form">
            <div className="dropdown-container">
              <div id="main-wipe3-2"></div>

              <div className="input-wrap">
                <input
                  id="inputline3"
                  type="text"
                  placeholder="I am a... "
                  autoComplete="off"
                  onChange={this.handleProfessionChange}
                  value={this.state.inputValue}
                />
                <p id="arrow3" className={enabled3}>&#x2192;</p>
              </div>
              <ul ref = { node => { this.node = node; }} id="dropdown-list" className={classnames({ "visible" : this.state.showDropdown, "hidden": !this.state.showDropdown })}>{this.renderSearchProfession()}</ul>
            </div>
          </form>
        </div>
      </div>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    step: state.step,
    fullName: state.fullName,
    goToMyURL: state.goToMyURL,
    myURL: state.myURL,
    profession: state.profession,
    filterProfessionList: state.filterProfessionList
  };
};

export default connect(mapStateToProps)(RootComponent);
