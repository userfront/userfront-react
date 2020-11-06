import React from "react";
import { processPage } from "@anymod/core";

const Toolkit = {
  /**
   * TODO
   * Add processPage into the method that gets returned
   * by signupForm (or other toolkit exports).  The same render chain
   * should be usable to determine find/create the page and then render
   * it into the component after it has been inserted into the DOM
   */
  async componentDidMount() {
    try {
      const page = await createOrReturnPage();
      const updatedPage = await checkPageAndUpdate(page);
      await processPage(updatedPage);
      executeCallbacks();
      logErrorsAndTips();
      setTimeout(uncloakNonMods, 1);
    } catch (err) {
      let message = err && err.message ? err.message : "Problem loading page";
      console.warn(message, err);
      uncloakNonMods();
    }
  },
  signupForm({ tenantId, toolId }) {
    return function Signup() {
      return <div id={`userfront-${toolId}`}></div>;
    };
  },
};

export default Toolkit;
