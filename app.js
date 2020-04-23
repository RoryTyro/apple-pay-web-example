
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
      hideApplePayButton: function () {
        document.getElementById(DOMStrings.appleButton).style.display = 'none'
      },
      displayErrorMessage: function () {
        document.getElementById(DOMStrings.errorMessage).style.display = 'block'
      }
    }
  })()
  
  var applePayController = (function (uiController) {
    var BACKEND_URL_VALIDATE_SESSION = 'https://{yourServer}/validateSession'
    var BACKEND_URL_PAY = 'https://{yourServer}/pay'
  
    // High level configuration options.
    var config = {
      payments: {
        acceptedCardSchemes: ['amex', 'masterCard', 'maestro', 'visa', 'mada']
      },
      shop: {
        product_price: 10.0,
        shop_name: 'Demo Shop',
        shop_localisation: {
          currencyCode: 'GBP',
          countryCode: 'GB'
        }
      },
      shipping: {
        GB_region: [
          {
            label: 'Free Shipping',
            amount: '0.00',
            detail: 'Arrives in 3-5 days',
            identifier: 'freeShipping'
          },
          {
            label: 'Express Shipping',
            amount: '5.00',
            detail: 'Arrives in 1-2 days',
            identifier: 'expressShipping'
          }
        ],
        WORLDWIDE_region: [
          {
            label: 'Worldwide Standard Shipping',
            amount: '10.00',
            detail: 'Arrives in 5-8 days',
            identifier: 'worldwideShipping'
          }
        ]
      }
    }
    /**
     * Checks if Apple Pay is possible in the current environment.
     * @return {boolean} Boolean to check if Apple Pay is possible
     */
    var _applePayAvailable = function () {
      return window.ApplePaySession && ApplePaySession.canMakePayments()
    }
  
    /**
     * Starts the Apple Pay session using a configuration
     */
    var _startApplePaySession = function (config) {
      var applePaySession = new ApplePaySession(6, config)
      _handleApplePayEvents(applePaySession)
      applePaySession.begin()
    }
  
    /**
     * This is the main method of the script, since here we handle all the Apple Pay
     * events. Here you are able to populate your shipping methods, react to  shipping methods
     * changes, and many other interaction that the user has with the Apple Pay pup-up.
     *
     * @param {object} Apple Pay Session (the one generate on the button click)
     *
     */
    var _handleApplePayEvents = function (appleSession) {
      // apple events
    }
  
    /**
     * Sets a onClick listen on the Apple Pay button. When clicked it will
     * begin the Apple Pay session with your configuration
     */
    var _setButtonClickListener = function () {
      document
        .getElementById(uiController.DOMStrings.appleButton)
        .addEventListener('click', function () {
          _startApplePaySession({
            currencyCode: config.shop.shop_localisation.currencyCode,
            countryCode: config.shop.shop_localisation.countryCode,
            merchantCapabilities: [
              'supports3DS',
              'supportsEMV',
              'supportsCredit',
              'supportsDebit'
            ],
            supportedNetworks: config.payments.acceptedCardSchemes,
            shippingType: 'shipping',
            requiredBillingContactFields: [
              'postalAddress',
              'name',
              'phone',
              'email'
            ],
            requiredShippingContactFields: [
              'postalAddress',
              'name',
              'phone',
              'email'
            ],
            total: {
              label: config.shop.shop_name,
              amount: config.shop.product_price,
              type: 'final'
            }
          })
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

