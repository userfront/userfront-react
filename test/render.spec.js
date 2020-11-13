import React from "react";
import { render, waitFor } from "@testing-library/react";
import Test from "./config/test.utils.js";
import core, { Singleton } from "@anymod/core";
// import core from "../src/core.map.js";
const { utils, crud } = core;

import Toolkit from "../src/index.js";

const scope = {};

const Signup = Toolkit.build({
  toolId: Test.factories.mods.basic.key,
  tenantId: "a1b2c3d4",
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

  it("should make a request to the proper endpoint", async () => {
    render(<Signup />);
    await waitFor(() => {
      expect(scope.postFn).toHaveBeenCalled();
    });
    console.log(Singleton.ApiUrl);
    console.log(scope.postFn.mock.calls[0]);
  });

  it("should render a signup form and its assets if no page exists yet", async () => {
    render(<Signup />);
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
