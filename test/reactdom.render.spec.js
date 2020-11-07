import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Test from "./config/test.utils.js";
import core from "@anymod/core";
const { utils } = core;

import Toolkit from "../src/index.js";

const scope = {};

const Signup = Toolkit.signupForm({
  tenantId: "A1B2",
  toolId: Test.factories.mods.basic.key,
});

describe("Render a signup form", () => {
  beforeAll(() => {
    scope.modCb = jest.fn();
    const tempFn = utils.loadPageAssets;
    utils.loadPageAssets = (a) => {
      console.log("loadPageAssets");
      return tempFn(a, { scriptTag, styleTag, modCb: scope.modCb });
    };
  });

  it("should render a signup component", async () => {
    render(<Signup />);
    expect(scope.modCb).toHaveBeenCalled();
    expect(document.body.innerHTML).toContain(
      `<div id="userfront-${Test.factories.mods.basic.key}"></div>`
    );
  });
});
