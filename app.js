 var applePayUiController = (function () {
  var DOMStrings = {
    appleButton: 'ckoApplePay',
    errorMessage: 'ckoApplePayError'
  }
  return {
    DOMStrings,
    displayApplePayButton: function () {
      document.getElementById(DOMStrings.appleButton).style.display = 'block'
    },
    displayErrorMessage: function () {
      document.getElementById(DOMStrings.errorMessage).style.display = 'block'
    }
  }
})()


var applePayController = (function (uiController) {
  /**
   * Checks if Apple Pay is possible in the current environment.
   * @return {boolean} Boolean to check if Apple Pay is possible
   */
  var _applePayAvailable = function () {
    return window.ApplePaySession && ApplePaySession.canMakePayments()
  }

  /**
   * Sets a onClick listen on the Apple Pay button. When clicked it will
   * begin the Apple Pay session with your configuration
   */
  var _setButtonClickListener = function () {
    document
      .getElementById(uiController.DOMStrings.appleButton)
      .addEventListener('click', function () {
        alert("TODO: Start Apple Session")
      })
  }

  return {
    init: function () {
      // If Apple Pay is available show the button otherwise show the error
      if (_applePayAvailable()) {
        // Notice we are using the functions from our UI controller
        uiController.displayApplePayButton()
      } else {
        uiController.hideApplePayButton()
        uiController.displayErrorMessage()
      }
      
      // Set the onClick listener on the Apple Pay button
      _setButtonClickListener()
    }
  }
})(applePayUiController) // passing the UI controller 

// Initialise the Apple Pay controller and let the magic happen
applePayController.init()