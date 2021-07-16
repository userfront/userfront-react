import React from "react";
import { render, waitFor } from "@testing-library/react";
import Test from "./config/test.utils.js";
import { utils, crud } from "@anymod/core";

import Toolkit, {
  SignupForm,
  LoginForm,
  PasswordResetForm,
  LogoutButton,
} from "../src/index.js";

const scope = {};

const SignupCustom = Toolkit.build({
  toolId: Test.factories.mods.basic.key,
});

describe("Render a signup form", () => {
  beforeAll(() => {
    // Mock the loading of page assets
    scope.loadMock = jest.fn();
    scope.loadFn = utils.loadPageAssets;
    utils.loadPageAssets = (a, b) => {
      scope.loadMock(a, b);
      return scope.loadFn(a, b);
    };
    // Mock the post request to get the page
    scope.postFn = jest.fn();
    crud.post = async (a) => {
      scope.postFn(a);
      return Test.factories.pages.basic;
    };
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  const toRun = [
    <SignupCustom />,
    <SignupForm toolId={Test.factories.mods.basic.key} />,
    <LoginForm toolId={Test.factories.mods.basic.key} />,
    <PasswordResetForm toolId={Test.factories.mods.basic.key} />,
    <LogoutButton toolId={Test.factories.mods.basic.key} />,
  ];

  // toRun.map((component) => {
  it(`should make a proper request to the endpoint`, async () => {
    render(toRun[0]);
    await waitFor(() => {
      expect(scope.postFn).toHaveBeenCalled();
    });
    expect(scope.postFn).toHaveBeenCalledWith([Test.factories.mods.basic.eid]);
  });
  // });

  it("should render a component and its assets if no page exists yet", async () => {
    render(toRun[0]);
    Test.fns.fireAllOnloads(document);
    await waitFor(() => {
      expect(scope.loadMock).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(document.body.innerHTML).toContain(
        Test.factories.mods.basic.html.replace(/(<div>)|(<\/div>)/g, "")
      );
      expect(document.head.innerHTML).toContain(Test.factories.mods.basic.css);
    });
  });

  xit("Should render with build option", async () => {
    render(<SignupCustom />);
    await waitFor(() => {
      expect(scope.postFn).toHaveBeenCalled();
    });
    expect(scope.postFn).toHaveBeenCalledWith([Test.factories.mods.basic.eid]);
  });

  xit("Should render with build option if no page exists yet", async () => {
    render(<SignupCustom />);
    Test.fns.fireAllOnloads(document);
    await waitFor(() => {
      expect(scope.loadMock).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(document.body.innerHTML).toContain(
        Test.factories.mods.basic.html.replace(/(<div>)|(<\/div>)/g, "")
      );
      expect(document.head.innerHTML).toContain(Test.factories.mods.basic.css);
    });
  });
});
