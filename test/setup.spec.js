import React from "react";
import { render, waitFor } from "@testing-library/react";
import Test from "./config/test.utils.js";
import AnyMod, { Singleton } from "@anymod/core";
// import core from "../src/core.map.js";
const { utils, crud } = AnyMod;

import Userfront from "../src/index.js";

const scope = {};

describe("Assert that page was properly setup for mods", () => {
  beforeEach(async () => {
    document.head.innerHTML = Test.factories.document.headInnerHtml;
    Singleton.Page = {};
    Singleton.init();
  });

  it("Should add AnyMod Script 1 for loading cached tools", async () => {
    const tenantId = "a1b2c3d4";
    const page = {
      id: 101,
      host: "example.com",
      pathname: "/page.html",
      mods: { basic: Test.factories.mods.basic },
    };
    crud.post = jest.fn(() => Promise.resolve(page));

    // Navigate to next page
    window.history.pushState({}, "Page title", page.pathname);

    // Initialize the form
    Userfront.init(tenantId);
    const Signup = Userfront.build({
      toolId: Test.factories.mods.basic.eid,
    });
    render(<Signup />);

    // Assert correct setup
    expect(Singleton.External.name).toEqual("Userfront");
    expect(Singleton.External.project).toEqual(tenantId);
    expect(document.head.innerHTML).toContain(
      `src="https://mod.userfront.com/v3/page/${tenantId}/`
    );
    expect(crud.post).toHaveBeenCalledWith(["basic"]);
  });

  it("Should not make a POST request if window.AnyModPageJs matches the page", async () => {
    const tenantId = "b9c8d7c6";
    const page = {
      id: 103,
      host: "example.com",
      pathname: "/nopost.html",
      mods: { plainjs: Test.factories.mods.plainjs },
    };
    crud.post = jest.fn(() => Promise.resolve(page));

    // Navigate to next page
    window.history.pushState({}, "Page title", page.pathname);

    // Initialize the form
    Userfront.init(tenantId);

    // Spoof that window.AnyModPageJs is defined
    window.AnyModPageJs = {
      page: {
        id: page.id,
        host: page.host,
        pathname: page.pathname,
        cssAssets: Test.factories.mods.plainjs.cssAssets,
        jsAssets: Test.factories.mods.plainjs.jsAssets,
        mods: page.mods,
      },
    };

    // Render the form
    const Login = Userfront.build({
      toolId: Test.factories.mods.plainjs.eid,
    });
    render(<Login />);

    // Assert correct setup
    expect(Singleton.External.name).toEqual("Userfront");
    expect(Singleton.External.project).toEqual(tenantId);
    expect(document.head.innerHTML).toContain(
      `src="https://mod.userfront.com/v3/page/${tenantId}/`
    );
    expect(crud.post).not.toHaveBeenCalled();
  });
});
