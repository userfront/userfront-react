import React, { memo } from "react";
// import core from "./core.map.js";
import AnyMod from "@anymod/core";
import Core from "@userfront/core";

const {
  Singleton,
  alias,
  // render,
  processPage,
  createOrReturnPage,
  checkPageAndUpdate,
  executeCallbacks,
  logErrorsAndTips,
} = AnyMod;

alias.setAlias("Userfront");
Singleton.Opts.api = true;

Core.registerUrlChangedEventListener();
window.addEventListener("urlchanged", () => {
  console.log("urlchanged");
  // render();
});

async function mountTools() {
  try {
    const page = await createOrReturnPage();
    const updatedPage = await checkPageAndUpdate(page);
    await processPage(updatedPage);
    executeCallbacks();
    logErrorsAndTips();
  } catch (err) {
    let message = err && err.message ? err.message : "Problem loading page";
    console.warn(message, err);
  }
}

const Userfront = {
  build({ tenantId, toolId }) {
    class Anon extends React.Component {
      componentDidMount() {
        mountTools();
      }
      render() {
        return (
          <div>
            <div id={`userfront-${toolId}`}></div>
          </div>
        );
      }
    }
    return memo(Anon);
  },
  /**
   * This is the hook way to do it, which we're not
   * using because it's not compatible with older
   * versions of React.
   */
  // hook({ tenantId, toolId }) {
  //   return function Anon() {
  //     useEffect(() => {
  //       mount();
  //     });
  //     return (
  //       <div>
  //         <div id={`userfront-${toolId}`}></div>
  //       </div>
  //     );
  //   };
  // },
};

for (const attr in Core) {
  if (!Userfront[attr]) Userfront[attr] = Core[attr];
}

export default Userfront;
