var $textfield,
  $textfield2,
  $textfield3,
  $arrow,
  $arrow3,
  $arrowURL,
  $step,
  $wipe,
  $wipe2,
  $wipe3,
  $wipe3_2,
  $stepLinks,
  $stepLinksBg,
  $stepLinksWipe,
  $URLwipeText,
  $URLwipeInput,
  $options,
  $signUpForm,
  $q1Form,
  $q2Form,
  $q3Form,
  $main,
  $main2,
  $main2URL,
  $main3,
  $dropdown,
  $dropdownList,
  $theme,
  $themeWipe,
  $themesTitle,
  $skip,
  $backButton,
  $hey2q;
var colours, randC;
var runAnimations = 0;
var runAnimations2 = 0;
var runAnimations3 = 0;
var runAnimations4 = 0;
var runAnimations5 = 0;

function prepareAnimationData(callback) {
  $textfield = $("#inputline");
  $textfield2 = $("#inputline2");
  $textfield3 = $("#inputline3");
  $arrow = $("#arrow");
  $arrowURL = $("#arrowURL");
  $arrow3 = $("#arrow3");
  $step = $("#step");
  $stepLinks = $(".step-link");
  $stepLinksBg = $(".step-link-bg");
  $stepLinksWipe = $(".main2-wipe");
  $URLwipeText = $("#URL-wipe");
  $URLwipeInput = $("#inputline2-wipe");
  $wipe = $("#main-wipe");
  $wipe2 = $("#main-wipe-2");
  $wipe3 = $("#main-wipe3");
  $wipe3_2 = $("#main-wipe3-2");
  $theme = $("a.browser");
  $themeWipe = $("#theme-wipe");
  $themesTitle = $(".theme-wrap-wipe").find("h1");
  $signUpForm = $("#signup_form");
  $q1Form = $("#q1-form");
  $q2Form = $("#q2-form");
  $q3Form = $("#q3-form");
  $main = $("#main");
  $main2 = $("#main2");
  $main3 = $("#main3");
  $main2URL = $("#main2-URL");
  $dropdown = $("#dropdown");
  $dropdownList = $("#dropdown-list");
  $skip = $("#skip");
  $backButton = $("#back-button");
  $hey2q = $("#hey2-q");

  colours = ["#000000", "#F8B88B", "#FF0036", "#6037E4", "#FF9960", "#FF5447", "#CA1C2C"];
  randC = colours[0];

  var prev_step;
  var step;

  history.pushState({ stepName: "step-1", step: 1 }, "", "");
  prev_step = 1;

  window.onresize = function() {
    for (var i = 0; i < $stepLinks.length; i++) {
      $($stepLinksBg[i]).css({ minWidth: $($stepLinks[i]).outerWidth() + 10 + "px", width: "100%", height: $($stepLinks[i]).outerHeight() + "px" });
    }
  };

  window.onpopstate = function(stateEvent) {
    var stepName = stateEvent.state.stepName;
    step = stateEvent.state.step;

    if (prev_step < step) {
      history.go(-1);
      return;
    }

    switch (stepName) {
      case "step-1":
        for (var i = 0; i < $stepLinks.length; i++) {
          p2wipe(i);
        }

        $wipe.animate({
          width: "100%"
        }, 350, "easeInOutCirc",function() {
          $q1Form.fadeTo(0, 1);
          $main.show();

          $wipe.css({
            left: "",
            right: 0
          });
          $wipe.delay(80).animate({
            width: "0%"
          }, 350, "easeInOutCirc",function() {
            $wipe.css({
              left: 0,
              right: "0"
            }, 0);
          });
        });

        $wipe2.animate({
          width: "100%"
        }, 350, "easeInOutCirc", function () {
          $("#hey").fadeTo(1, 1);
          $wipe2.css({
            left: "",
            right: 0
          });
          $wipe2.delay(80).animate({
            width: "0%"
          }, 350, "easeInOutCirc", function () {
            $wipe2.css({
              left: 0,
              right: "0"
            }, 0);
          });
        });

        prev_step = step;
        break;

      case "step-2":
        $wipe3.animate({
          width: "100%"
        }, 350, "easeInOutCirc",function() {
          $q3Form.fadeTo(1, 0);
          $wipe3.css({
            left: "",
            right: 0
          });
          animateOutURL();
          animateInWhy();
          formatAnalytics.track("G006 Onboarding Seen", { step: "Purpose" });
          $wipe3.delay(80).animate({
            width: "0%"
          }, 350, "easeInOutCirc",function() {
            $wipe3.css({
              left: 0,
              right: "0"
            }, 0);
            $main3.hide();
          });
        });

        $wipe3_2.animate({
          width: "100%"
        }, 350, "easeInOutCirc",function() {
          $("#hey3").fadeTo(1, 0);
          $wipe3.css({
            left: "",
            right: 0
          });
          $wipe3_2.delay(80).animate({
            width: "0%"
          }, 350, "easeInOutCirc",function() {
            $wipe3_2.css({
              left: 0,
              right: "0"
            }, 0);
          });
        });

        prev_step = step;
        break;

      case "step-3":
        $wipe3.delay(150).animate({
          width: "100%"
        }, 150, "easeInOutCirc",function() {

          $q3Form.fadeTo(1, 1);

          $wipe3.css({
            left: "",
            right: 0
          });

          $main3.show();
          formatAnalytics.track("G006 Onboarding Seen", { step: "Profession" });

          $wipe3.delay(80).animate({
            width: "0%"
          }, 350, "easeInOutCirc",function() {

            $wipe3.css({
              left: 0,
              right: "0"
            }, 0);
            $dropdown.show();
            $dropdownList.removeClass("visible").addClass("hidden");
          });
        });

        $wipe3_2.delay(150).animate({
          width: "100%"
        }, 150, "easeInOutCirc",function() {
          $("#hey3").fadeTo(1, 1);

          $wipe3_2.css({
            left: "",
            right: 0
          });

          $wipe3_2.delay(80).animate({
            width: "0%"
          }, 350, "easeInOutCirc",function() {
            $wipe3_2.css({
              left: 0,
              right: "0"
            }, 0);
          });
        });

        var themeList = self.$theme;
        for (var i = 0; i < themeList.length; i++) {

          !function(){
            var index = i;
            var element = $(themeList[index]).children(".browser-wipe");

            setTimeout(function() {
              element.css({
                background: "black",
                opacity: 1
              });
            }, index * 100);

            setTimeout(function() {
              element.css({
                opacity: 0
              });
              $(themeList[index]).css({
                opacity: 0
              });
            }, (index + 1) * 100);
          }();
        }

        $themeWipe.animate({
          width: "100%"
        }, 350, "easeInOutCirc",function() {
          $themesTitle.fadeTo(1, 0);
          $themeWipe.css({
            left: "",
            right: 0
          });
          $themeWipe.delay(80).animate({
            width: "0%"
          }, 350, "easeInOutCirc",function() {
            $themeWipe.css({
              left: 0,
              right: "0"
            }, 0);
            $signUpForm.hide();
          });
        });

        prev_step = step;
        break;

      case "step-4":
        prev_step = step;
        break;

      default:
        console.info("Step doesn/'t exist.");
        return;
    }
  };

  $dropdownList.on("mouseenter", ".option", function(e) {
    for (var i = 0; i < $($dropdownList).children().length; i++) {
      if (e.target !== $($dropdownList).children()[i]) {
        $($($dropdownList).children()[i]).css({ color: "#bcbbc3", background: "#eaeaec" });
      } else {
        $(e.target).css({ background: "#000", color: "#fff" });
      }
    }
  });

  $dropdownList.on("mouseleave", function() {
    $($dropdownList).children().css({ color: "#000", background: "#eaeaec" });
  });

  $backButton.on("click", function() {
    $(this).fadeTo(20, 0);
    $URLwipeText.animate({
      width: "100%"
    }, 350, "easeInOutCirc",function() {
      $hey2q.fadeTo(1, 0);
      $textfield2.fadeTo(1, 0);
      $skip.fadeTo(1, 0);

      $URLwipeText.css({
        left: "",
        right: 0
      });
      animateInWhy();
      $URLwipeText.delay(80).animate({
        width: "0%"
      }, 350, "easeInOutCirc",function() {
        $URLwipeText.css({
          left: 0,
          right: "0"
        }, 0);
      });
    });

    $URLwipeInput.animate({
      width: "100%"
    }, 350, "easeInOutCirc",function() {
      $textfield2.fadeTo(1, 0);
      $URLwipeInput.css({
        left: "",
        right: 0
      });
      animateInWhy();
      $URLwipeInput.delay(80).animate({
        width: "0%"
      }, 350, "easeInOutCirc",function() {
        $URLwipeInput.css({
          left: 0,
          right: "0"
        }, 0);
        formatAnalytics.track("G006 Onboarding Seen", { step: "Purpose" });
        $main2URL.hide();
      });
    });
  });

  $q1Form.on("submit", function (e) {
    history.pushState({ stepName: "step-2", step: 2}, "", "" );
    prev_step = 2;

    e.preventDefault();

    $wipe.animate({
      width: "100%"
    }, 350, "easeInOutCirc", function () {
      $q1Form.fadeTo(1, 0);
      $wipe.css({
        left: "",
        right: 0
      });
      animateInWhy();
      $wipe.delay(80).animate({
        width: "0%"
      }, 350, "easeInOutCirc", function () {
        $wipe.css({
          left: 0,
          right: "0"
        }, 0);
        formatAnalytics.track("G006 Onboarding Seen", {step: "Purpose"});
        $main.hide();
      });
    });

    $wipe2.animate({
      width: "100%"
    }, 350, "easeInOutCirc", function () {
      $("#hey").fadeTo(1, 0);
      $wipe2.css({
        left: "",
        right: 0
      });
      $wipe2.delay(80).animate({
        width: "0%"
      }, 350, "easeInOutCirc", function () {
        $wipe2.css({
          left: 0,
          right: "0"
        }, 0);
      });
    });
  });

  $q2Form.on("submit", function(e) {
    e.preventDefault();
    animateOutURL();
    setTimeout(animateInProf, 350);
  });

  $q3Form.on("submit", function(e) {
    history.pushState({ stepName: "step-4", step: 4 }, "", "");
    prev_step = 4;

    if (runAnimations4 >= $stepLinks.length) {
      return;
    }
    callback();
    runAnimations4++;
    e.preventDefault();
    $dropdown.removeClass("active").hide();

    $wipe3.animate({
      width: "100%"
    }, 350, "easeInOutCirc",function() {
      $q3Form.fadeTo(1, 0);
      $("#hey3").fadeTo(1, 0);
      $wipe3.css({
        left: "",
        right: 0
      });
      animateInTheme();
      formatAnalytics.track("G006 Onboarding Seen", { step: "Theme" });
      $wipe3.delay(80).animate({
        width: "0%"
      }, 350, "easeInOutCirc",function() {
        $wipe3.css({
          left: 0,
          right: "0"
        }, 0);
        $main3.hide();
      });
      runAnimations4--;
    });

    $wipe3_2.animate({
      width: "100%"
    }, 350, "easeInOutCirc",function() {
      $wipe3_2.css({
        left: "",
        right: 0
      });
      $wipe3_2.delay(80).animate({
        width: "0%"
      }, 350, "easeInOutCirc",function() {
        $wipe3_2.css({
          left: 0,
          right: "0"
        }, 0);
      });
    });

    $step.innerHTML = "04 - Pick a Theme";
  });

  $arrow.on("click", function() {
    if (this.className == "active") {
      $q1Form.submit();
    }
  });

  $arrow3.on("click", function() {
    if (this.className == "active") {
      $q3Form.submit();
    }
  });

  $stepLinks.on("mouseenter", function() {
    for (var i = 0; i < $stepLinks.length; i++) {
      if ($(this)[0] !== $($stepLinks[i])[0]) {
        $($stepLinks[i]).find(".step-link-text").css({color: "#bcbbc3", mixBlendMode: "normal"})
      }
    }

    if (CSS && CSS.supports("mix-blend-mode", "difference")) {
      var width;
      var stepWipe = $(this).find(".step-link-wipe");
      stepWipe.hide();
      stepWipe.css({ width: "100%", height: $(this).outerHeight() + "px" });

      if ($(this).outerWidth() === stepWipe.outerWidth()) {
        width = 100;
      } else {
        width = Math.floor(($(this).find(".step-link-text").outerWidth() / stepWipe.outerWidth()) * 100);
      }
      var rightPad = width - 100;

      stepLinksHover(stepWipe, width, rightPad);
    }
  });

  $stepLinks.on("mouseleave", function() {
    for (var i = 0; i < $stepLinks.length; i++) {
      $($stepLinks[i]).find(".step-link-text").css({color: "", mixBlendMode: ""})
    }

    if (window.CSS && window.CSS.supports("mix-blend-mode", "difference")) {
      var elem = $(this).find(".step-link-wipe");

      elem.animate({
        width: "0%"
      }, 450, "easeInOutCirc",function() {
        elem.css({
          right: "",
          left: "0"
        });
      });
    }
  });

  $stepLinks.on("click", function() {

    history.pushState({ stepName: "step-3", step: 3 }, "", "");
    prev_step = 3;

    for (var i = 0; i < $stepLinks.length; i++) {
      p2wipe(i);
    }
    if (this.id === "step-link-1") {
      animateInURL();
    } else {
      setTimeout(animateInProf, 350);
    }
  });

  $arrowURL.on("click", function() {
    if (this.className == "active") {
      $q2Form.submit();
    }
  });

  $skip.on("click", function() {
    animateOutURL();
    setTimeout(animateInProf, 450);
  });
  var self = this;

  $theme.on("click", function() {
    var themeList = self.$theme;
    for (var i = 0; i < themeList.length; i++) {

      !function(){
        var index = i;
        var element = $(themeList[index]).children(".browser-wipe");

        setTimeout(function() {
          element.css({
            background: "black",
            opacity: 1
          });
        }, index * 100);

        setTimeout(function() {
          element.css({
            background: "#eaeaec"
          });
        }, (index + 3) * 100);
      }();
    }

    $themeWipe.animate({
      width: "100%"
    }, 350, "easeInOutCirc",function() {
      $themeWipe.css({
        left: "",
        right: 0
      });
      $themeWipe.delay(80).animate({
        width: "0%"
      }, 350, "easeInOutCirc",function() {
        $themeWipe.css({
          left: 0,
          right: "0"
        }, 0);
        $("#maintheme").hide();
      });
    });
  });
}

function stepLinksHover(elem, width, rightPad) {
  elem.show();
  elem.css({width: "0%"});
  elem.animate({
    width: width+ "%"
  }, 450, "easeInOutCirc",function() {
    elem.css({
      left: "",
      right: "-" +rightPad+ "%"
    });
  });
}

function removeEvents() {
  $textfield && $textfield.off("input");
  $textfield2 && $textfield2.off("input");
  $textfield3 && $textfield3.off("input");
  $skip && $skip.off("mouseenter");
  $skip && $skip.off("mouseleave");
  $backButton && $backButton.off("click");
  $q1Form && $q1Form.off("submit");
  $q3Form && $q3Form.off("submit");
  $arrow && $arrow.off("click");
  $arrow3 && $arrow3.off("click");
  $stepLinks && $stepLinks.off("mouseenter");
  $stepLinks && $stepLinks.off("mouseleave");
  $options && $options.off("mouseenter");
  $options && $options.off("mouseleave");
  $arrowURL && $arrowURL.off("click");
  $skip && $skip.off("click");
  $theme && $theme.off("click");
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function animateInWhy() {
  $main2.show();
  for (var a = 0; a < $stepLinks.length; a++) {
    p2In(a);
  }
}

function p2In(a) {
  var text = $($stepLinks[a]).find(".step-link-text");
  $($stepLinksBg[a]).css({ minWidth: $($stepLinks[a]).outerWidth() + 10 + "px", width: "100%", height: $($stepLinks[a]).outerHeight() + "px" });

  $($stepLinks[a]).fadeTo(1, 1);
  $($stepLinksWipe[a]).animate({
    width: "100%"
  }, 350, "easeInOutCirc",function() {
    $($stepLinksWipe[a]).css({
      left: "",
      right: 0
    });
    text.fadeTo(1, 1);
    $($stepLinksWipe[a]).delay(80).animate({
      width: "0%"
    }, 350, "easeInOutCirc",function() {
      $($stepLinksWipe[a]).css({
        left: 0,
        right: "0"
      }, 0);

      if (!window.CSS || !window.CSS.supports("mix-blend-mode", "difference")) {
        $($stepLinksBg[a]).hide();
      }
    });
  });
}

function animateInURL() {
  if (runAnimations2 >= $stepLinks.length) {
    return;
  }
  runAnimations2++;

  $main2URL.show();
  formatAnalytics.track("G006 Onboarding Seen", { step: "Portfolio URL" });

  $backButton.fadeTo(20, 1);

  setTimeout(function(){
    $URLwipeText.animate({
      width: "100%"
    }, 350, "easeInOutCirc",function() {
      $hey2q.fadeTo(1, 1);
      $textfield2.fadeTo(1, 1);
      $skip.fadeTo(1, 1);

      $URLwipeText.css({
        left: "",
        right: 0
      });
      $URLwipeText.delay(1).animate({
        width: "0%"
      }, 350, "easeInOutCirc",function() {
        $URLwipeText.css({
          left: 0,
          right: "0"
        }, 0);
      });
    });


    $URLwipeInput.animate({
      width: "100%"
    }, 350, "easeInOutCirc",function() {
      $textfield2.fadeTo(1, 1);
      $URLwipeInput.css({
        left: "",
        right: 0
      });
      $URLwipeInput.delay(1).animate({
        width: "0%"
      }, 350, "easeInOutCirc",function() {
        $URLwipeInput.css({
          left: 0,
          right: "0"
        }, 0);
      });
      runAnimations2--;

    });
  },200);
}

function animateOutURL() {
  if (runAnimations5 >= $stepLinks.length) {
    return;
  }
  runAnimations5++;

  $backButton.fadeTo(20, 0);
  $URLwipeText.animate({
    width: "100%"
  }, 350, "easeInOutCirc",function() {
    $hey2q.fadeTo(1, 0);
    $textfield2.fadeTo(1, 0);
    $skip.fadeTo(1, 0);

    $URLwipeText.css({
      left: "",
      right: 0
    });
    //animateInWhy();
    $URLwipeText.delay(10).animate({
      width: "0%"
    }, 350, "easeInOutCirc",function() {
      $URLwipeText.css({
        left: 0,
        right: "0"
      }, 0);
    });
  });

  $URLwipeInput.animate({
    width: "100%"
  }, 350, "easeInOutCirc",function() {
    $textfield2.fadeTo(1, 0);
    $URLwipeInput.css({
      left: "",
      right: 0
    });
    //animateInWhy();
    $URLwipeInput.delay(10).animate({
      width: "0%"
    }, 350, "easeInOutCirc",function() {
      $URLwipeInput.css({
        left: 0,
        right: "0"
      }, 0);
      $main2URL.hide();
    });
    runAnimations5--;

  });
}

function animateInProf() {
  if (runAnimations3 >= $stepLinks.length) {
    return;
  }
  runAnimations3++;

  $wipe3.animate({
    width: "100%"
  }, 150, "easeInOutCirc",function() {

    $q3Form.fadeTo(1, 1);
    $("#hey3").fadeTo(1, 1);

    $wipe3.css({
      left: "",
      right: 0
    });

    $main3.show();
    formatAnalytics.track("G006 Onboarding Seen", { step: "Profession" });

    $wipe3.delay(80).animate({
      width: "0%"
    }, 350, "easeInOutCirc",function() {
      $wipe3.css({
        left: 0,
        right: "0"
      }, 0);
      $dropdown.show();
    });
    runAnimations3--;
  });

  $wipe3_2.animate({
    width: "100%"
  }, 150, "easeInOutCirc",function() {

    $wipe3_2.css({
      left: "",
      right: 0
    });

    $wipe3_2.delay(80).animate({
      width: "0%"
    }, 350, "easeInOutCirc",function() {
      $wipe3_2.css({
        left: 0,
        right: "0"
      }, 0);
    });
  });

}

var self = this;

function animateInTheme() {
  $signUpForm.show();
  $("#logo").hide();
  $themesTitle.fadeTo(1, 0);

  $themeWipe.animate({
    width: "100%"
  }, 350, "easeInOutCirc",function() {
    $themesTitle.fadeTo(1, 1);
    $themeWipe.css({
      left: "",
      right: 0
    });
    $themeWipe.delay(80).animate({
      width: "0%"
    }, 350, "easeInOutCirc",function() {
      $themeWipe.css({
        left: 0,
        right: "0"
      }, 0);
    });
  });
  $step.innerHTML = "04 - Pick a Theme";

  var themeList = self.$theme;

  for (var i = 0; i < themeList.length; i++) {
    !function(){
      var index = i;
      var element = $(themeList[index]);

      setTimeout(function() {
        element.children(".browser-wipe").css({
          opacity: 0
        });
        element.css({
          opacity: 1
        });
      }, index * 100);
    }();
  }
}

function p2wipe(a) {
  var text = $($stepLinks[a]).find(".step-link-text");
  if (runAnimations >= $stepLinks.length) {
    return;
  }
  runAnimations++;

  if (!window.CSS || !window.CSS.supports("mix-blend-mode", "difference")) {
    $($stepLinksBg[a]).show();
  }

  $($stepLinksWipe[a]).animate({
    width: "100%"
  }, 350, "easeInOutCirc",function() {
    $($stepLinksWipe[a]).css({
      left: "",
      right: 0
    });
    text.fadeTo(1, 0);
    $($stepLinksWipe[a]).delay(80).animate({
      width: "0%"
    }, 350, "easeInOutCirc",function() {
      $($stepLinksWipe[a]).css({
        left: 0,
        right: "0"
      }, 0);

      if (a == 2) {
        $main2.hide();
      }
      runAnimations--;
    });
  });
}
