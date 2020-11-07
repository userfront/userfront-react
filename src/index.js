import React, { useEffect } from "react";
import core from "@anymod/core";
const {
  Singleton,
  processPage,
  createOrReturnPage,
  checkPageAndUpdate,
  executeCallbacks,
  logErrorsAndTips,
  uncloakNonMods,
} = core;

async function pager() {
  try {
    console.log(document.body.innerHTML);
    console.log(Singleton);
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
}

const Toolkit = {
  /**
   * TODO
   * Add processPage into the method that gets returned
   * by signupForm (or other toolkit exports).  The same render chain
   * should be usable to determine find/create the page and then render
   * it into the component after it has been inserted into the DOM
   */
  async componentDidMount() {},

  signupForm({ tenantId, toolId }) {
    return function Signup() {
      useEffect(() => {
        pager();
      });
      return <div id={`userfront-${toolId}`}></div>;
    };
  },
};

export default Toolkit;
