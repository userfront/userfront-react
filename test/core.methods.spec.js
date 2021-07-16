import Cookie from "js-cookie";
import Userfront from "../src/index.js";
const UserfrontRequire = require("../src/index.js").default;

const tenantId = "test1234";
Userfront.init(tenantId);

describe("Userfront Core JS", () => {
  it("methods should be present with import or require", () => {
    const coreMethods = [
      "init",
      "signup",
      "login",
      "logout",
      "redirectIfLoggedIn",
      "resetPassword",
      "sendLoginLink",
      "sendResetLink",
      "accessToken",
      "idToken",
    ];
    coreMethods.map((method) => {
      expect(typeof Userfront[method]).toEqual("function");
      expect(typeof UserfrontRequire[method]).toEqual("function");
    });
  });

  it("should be able to access the methods on the DOM", () => {
    const cookieValue = "foobarbaz";
    Cookie.set(`access.${tenantId}`, cookieValue);
    expect(Userfront.accessToken()).toEqual(cookieValue);
  });
});
