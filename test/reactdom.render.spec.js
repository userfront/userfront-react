import React from "react";
import ReactDOM from "react-dom";
import Toolkit from "../src/index.js";

const Signup = Toolkit.signupForm({
  tenantId: "A1B2",
  toolId: "abcdefg",
});

function App() {
  return (
    <div>
      <Signup />
    </div>
  );
}

describe("Render a signup form", () => {
  beforeAll(() => {
    document.body.innerHTML = '<div id="root"></div>';
    // scope.modCb = jest.fn();
    // const tempFn = utils.loadPageAssets;
    // utils.loadPageAssets = (a) => {
    //   return tempFn(a, { scriptTag, styleTag, modCb: scope.modCb });
    // };
  });

  it("should render a signup component", () => {
    ReactDOM.render(<App />, document.getElementById("root"));
    expect(document.body.innerHTML).toContain(
      `<div id="userfront-abcdefg"></div>`
    );
  });
});
