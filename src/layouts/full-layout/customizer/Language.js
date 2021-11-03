import { useEffect } from "react";
import PropTypes from "prop-types";
import {IntlProvider} from "react-intl";

import EnglishMessages from "./../../../assets/lang/en-US.json";
import SpanishMessages from "./../../../assets/lang/es-ES.json";

const LangSettings = (props) => {
  const { children, lang } = props;

  useEffect(() => {
    document.lang = lang;
  }, [lang]);

  if (lang === "en") {
    return (
      <LangSettings value={lang}>
        <IntlProvider locale={lang} messages={EnglishMessages}>
          {children}
        </IntlProvider>
      </LangSettings>
    );
  } else if (lang === "es") {
    return (
        <LangSettings value={lang}>
          <IntlProvider locale={lang} messages={SpanishMessages}>
            {children}
          </IntlProvider>
        </LangSettings>
      );
  }

  return <>{children}</>;
};

LangSettings.propTypes = {
  children: PropTypes.node.isRequired,
  lang: PropTypes.oneOf(["es", "en"]),
};

export default LangSettings;
