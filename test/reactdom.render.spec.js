import React from "react";
import { render, waitFor } from "@testing-library/react";
import Test from "./config/test.utils.js";
import core from "@anymod/core";
// import core from "../src/core.map.js";
const { utils, crud } = core;

import Toolkit from "../src/index.js";

const scope = {};

const Signup = Toolkit.signupForm({
  tenantId: "FOOBAR",
  toolId: Test.factories.mods.basic.key,
});

describe("Render a signup form", () => {
  beforeAll(() => {
    scope.loadMock = jest.fn();
    scope.loadFn = utils.loadPageAssets;
    utils.loadPageAssets = (a, b) => {
      scope.loadMock(a, b);
      return scope.loadFn(a, b);
    };
    scope.postFn = jest.fn();
    crud.post = async (a) => {
      scope.postFn(a);
      return Test.factories.pages.basic;
    };
  });

  it("should render a signup form and its assets if no page exists yet", async () => {
    render(<Signup />);
    await waitFor(() => {
      expect(scope.postFn).toHaveBeenCalled();
    });
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
    return Promise.resolve();
  });
});
