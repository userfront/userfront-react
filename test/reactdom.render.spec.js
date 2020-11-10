import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Test from "./config/test.utils.js";
import core from "@anymod/core";
const { Singleton, utils, crud } = core;

import Toolkit from "../src/index.js";

const scope = {};

const Signup = Toolkit.signupForm({
  tenantId: "FOOBAR",
  toolId: Test.factories.mods.basic.key,
});

describe("Render a signup form", () => {
  beforeAll(() => {
    scope.modCb = jest.fn();
    const tempLoadFn = utils.loadPageAssets;
    utils.loadPageAssets = (a, b) => {
      return tempLoadFn(a, {
        modCb: scope.modCb,
        ...b,
      });
    };
    scope.postFn = jest.fn();
    crud.post = async (a) => {
      scope.postFn(a);
      return Test.factories.pages.basic;
    };
  });

  it("should render a signup form and its assets if no page exists yet", async () => {
    Singleton.Opts.debug = true;
    render(<Signup />);
    await waitFor(() => {
      expect(scope.postFn).toHaveBeenCalled();
    });
    Test.fns.fireAllOnloads();
    await waitFor(() => {
      expect(scope.modCb).toHaveBeenCalled();
      expect(document.body.innerHTML).toContain(Test.factories.mods.basic.html);
    });
    console.log("head", document.head.innerHTML);
    console.log("body", document.body.innerHTML);
    console.log("here");
    expect(document.head.innerHTML).toContain(Test.factories.mods.basic.css);
    expect(document.body.innerHTML).toContain(Test.factories.mods.basic.html);
    expect(document.body.innerHTML).toContain(
      `<div id="userfront-${Test.factories.mods.basic.key}"></div>`
    );
    expect(scope.modCb).toHaveBeenCalled();
  });
});
