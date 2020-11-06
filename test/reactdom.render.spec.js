import React from "react";
import ReactDOM from "react-dom";
import Toolkit from "../src/index.js";

const Signup = Toolkit.signupForm({
  tenantId: "A1B2",
  toolId: "abcdefg",
});
console.log({ Toolkit });

// function Signup() {
//   return <form>Signup form</form>;
// }

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
  });

  it("should render a signup component", () => {
    ReactDOM.render(<App />, document.getElementById("root"));
    expect(document.body.innerHTML).toContain("<form>Signup form</form>");
  });
});
