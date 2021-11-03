import { createContext, Component, createElement } from "react";

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  // eslint-disable-next-line no-proto
  subClass.__proto__ = superClass;
}

const CulqiContext = createContext({});
const Culqi = CulqiContext.Consumer;

const culqiMessages = {
  welcome: "checkout_bienvenido",
  closed: "checkout_cerrado",
};
const baseCulqiUrl = "https://checkout.culqi.com";
const culqiId = "culqi-js";
const culqiUrl = baseCulqiUrl + "/js/v3";

const CulqiCheckout =
  /* #__PURE__ */
  (function (_Component) {
    _inheritsLoose(CulqiCheckout, _Component);

    function CulqiCheckout() {
      // eslint-disable-next-line no-var
      var _this;

      for (
        // eslint-disable-next-line no-var
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      _this = _Component.call.apply(_Component, [this].concat(args)) || this;
      _this.state = {
        amount: _this.props.amount || 0,
        currency: _this.props.currency || "PEN",
        description: _this.props.description || "",
      };

      _this.getCulqiSettings = function () {
        const amount = _this.state.amount;
        const currency = _this.state.currency;
        const description = _this.state.description;
        // eslint-disable-next-line one-var
        const _this$props = _this.props,
          _this$props$title = _this$props.title,
          // eslint-disable-next-line no-void
          title = _this$props$title === void 0 ? "" : _this$props$title;
        return {
          amount: amount,
          currency: currency,
          description: description,
          title: title,
        };
      };

      _this.initCulqi = function () {
        const _this$props2 = _this.props;
        const publicKey = _this$props2.publicKey;
        const _this$props2$options = _this$props2.options;
        const options =
          // eslint-disable-next-line no-void
          _this$props2$options === void 0 ? {} : _this$props2$options;

        const culqiSettings = _this.getCulqiSettings();

        _this.setCulqiOptions(options);

        window.Culqi.publicKey = publicKey;
        requestAnimationFrame(function () {
          _this.setCulqiSettings(culqiSettings);
        }); // Patch it so it doesn't throw on browser

        window.culqi = function () {};
      };

      _this.onCulqiLoad = function (e) {
        if (window.Culqi) {
          _this.initCulqi();
        }
      };

      _this.onCulqiEvent = function (messageEvent) {
        const origin = messageEvent.origin;
        const data = messageEvent.data;
        const _this$props3 = _this.props;
        const onClose = _this$props3.onClose;
        const onError = _this$props3.onError;
        const onToken = _this$props3.onToken;
        if (origin !== baseCulqiUrl) return;

        if (typeof data === "string" && data === culqiMessages.closed) {
          onClose && onClose();

          _this.initCulqi();
        }

        if (typeof data === "object") {
          const object = data.object;
          if (!object) return;

          if (object === "token") {
            _this.setState(
              {
                token: data,
              },
              function () {
                onToken && onToken(data);
              }
            );
          } else if (object === "error") {
            _this.setState(
              {
                error: data,
              },
              function () {
                onError && onError(data);
              }
            );
          }
        }
      };

      _this.openCulqi = function () {
        if (window.Culqi) {
          window.Culqi.open();
        }
      };

      _this.setCulqiOptions = function (userOptions) {
        if (Object.keys(userOptions).length > 0 && window.Culqi) {
          window.Culqi.options(userOptions);
        }
      };

      _this.setCulqiSettings = function (settings) {
        if (window.Culqi) {
          window.Culqi.settings(settings);
        }
      };

      _this.setAmount = function (amount) {
        _this.setState({
          amount: amount || 0,
        });
      };

      _this.setCurrency = function (currency) {
        _this.setState({
          currency: currency || "PEN",
        });
      };

      _this.setDescription = function (description) {
        _this.setState({
          description: description || "",
        });
      };

      return _this;
    }

    const _proto = CulqiCheckout.prototype;

    _proto.componentDidMount = function componentDidMount() {
      if (!this.props.publicKey) return;
      const script = document.createElement("script");
      script.id = culqiId;
      script.src = culqiUrl;
      script.async = true;
      script.onload = this.onCulqiLoad;
      this.culqiScript = script;
      document.body.appendChild(this.culqiScript);
      window.addEventListener("message", this.onCulqiEvent, false);
    };

    _proto.componentDidUpdate = function componentDidUpdate(
      prevProps,
      prevState
    ) {
      if (prevState.amount !== this.state.amount) {
        this.setCulqiSettings(this.getCulqiSettings());
      }
      if (prevState.currency !== this.state.currency) {
        this.setCulqiSettings(this.getCulqiSettings());
      }
      if (prevState.description !== this.state.description) {
        this.setCulqiSettings(this.getCulqiSettings());
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this.culqiScript) {
        this.culqiScript.parentNode.removeChild(this.culqiScript);
      }

      window.removeEventListener("message", this.onCulqiEvent, false);
      window.culqi = undefined;
    };

    _proto.render = function render() {
      if (!this.props.publicKey) {
        throw new Error("Please pass along a `publicKey` prop.");
      }

      // eslint-disable-next-line react/no-children-prop
      return createElement(CulqiContext.Provider, {
        children: this.props.children,
        value: {
          openCulqi: this.openCulqi,
          setAmount: this.setAmount,
          setCurrency: this.setCurrency,
          setDescription: this.setDescription,
          amount: this.state.amount,
          currency: this.state.currency,
          description: this.state.description,
          token: this.state.token,
          error: this.state.error,
        },
      });
    };

    return CulqiCheckout;
  })(Component);

export { CulqiCheckout as CulqiProvider, Culqi };
