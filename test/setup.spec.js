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

  it("Should add AnyMod Script 1 and should not make a POST request if a page is found", async () => {
    const mod = Test.factories.mods.basic;
    const tenantId = "a1b2c3d4";
    const page = {
      id: 101,
      host: "example.com",
      pathname: "/page.html",
      mods: { basic: mod },
    };
    crud.post = jest.fn(() => Promise.resolve({}));

    // Navigate to next page
    window.history.pushState({}, "Page title", page.pathname);

    // Initialize the form
    Userfront.init(tenantId);
    const Signup = Userfront.build({
      toolId: mod.eid,
    });
    render(<Signup />);

    // Assert correct setup
    expect(Singleton.External.name).toEqual("Userfront");
    expect(Singleton.External.project).toEqual(tenantId);

    // Assert Script 1 in head
    expect(document.head.innerHTML).toContain(
      `src="https://mod.userfront.com/v3/page/${tenantId}/`
    );

    // Mock the page being found
    window.AnyModPageJs = {
      page: {
        id: page.id,
        host: page.host,
        pathname: page.pathname,
        cssAssets: [],
        jsAssets: [],
        mods: page.mods,
      },
    };
    const el = document.querySelector(
      `script[src^="https://mod.userfront.com/v3/page/${tenantId}/"]`
    );
    el.onload();

    expect(crud.post).not.toHaveBeenCalled();
  });

  it("Should add AnyMod Script 1 and should make a POST request if a page is not found", async () => {
    const mod = Test.factories.mods.plainjs;
    const tenantId = "b2c3d4e5";
    const page = {
      id: 101,
      host: "example.com",
      pathname: "/page.html",
      mods: { plainjs: mod },
    };
    crud.post = jest.fn(() => Promise.resolve({}));

    // Navigate to next page
    window.history.pushState({}, "Page title", page.pathname);

    // Initialize the form
    Userfront.init(tenantId);
    const Signup = Userfront.build({
      toolId: mod.eid,
    });
    render(<Signup />);

    // Assert correct setup
    expect(Singleton.External.name).toEqual("Userfront");
    expect(Singleton.External.project).toEqual(tenantId);
    expect(document.head.innerHTML).toContain(
      `src="https://mod.userfront.com/v3/page/${tenantId}/`
    );

    // Mock the page not being found
    window.AnyModPageJs = {
      page: {
        error: "Not Found",
        message: "Not Found",
        statusCode: 404,
      },
    };
    const el = document.querySelector(
      `script[src^="https://mod.userfront.com/v3/page/${tenantId}/"]`
    );
    el.onload();

    // Mock the page being found
    expect(crud.post).toHaveBeenCalledWith([mod.eid]);
  });
});
