import Cookie from "js-cookie";
import Userfront from "../src/index.js";

const tenantId = "test1234";

describe("Userfront Core JS", () => {
  it("methods should be present", () => {
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
    });
  });

  it("should be able to access the methods on the DOM", () => {
    const cookieValue = "foobarbaz";
    Cookie.set(`access.${tenantId}`, cookieValue);
    expect(Userfront.accessToken()).toEqual(cookieValue);
  });
});
