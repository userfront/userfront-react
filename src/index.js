import React, { useEffect } from "react";
import core from "@anymod/core";
const {
  Singleton,
  alias,
  processPage,
  createOrReturnPage,
  checkPageAndUpdate,
  executeCallbacks,
  logErrorsAndTips,
  uncloakNonMods,
} = core;

async function pager() {
  try {
    const page = await createOrReturnPage();
    const updatedPage = await checkPageAndUpdate(page);
    console.log("Start processing");
    await processPage(updatedPage);
    console.log("Done processing");
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
  signupForm({ tenantId, toolId }) {
    alias.setAlias("Userfront");
    Singleton.Opts.api = true;
    return function Signup() {
      useEffect(() => {
        pager();
      });
      return <div id={`userfront-${toolId}`}></div>;
    };
  },
};

export default Toolkit;
