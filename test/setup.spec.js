import React from "react";
import { render, waitFor } from "@testing-library/react";
import Test from "./config/test.utils.js";
import core, { Singleton } from "@anymod/core";
// import core from "../src/core.map.js";
const { utils, crud } = core;

import Toolkit from "../src/index.js";

const scope = {};

describe("Assert that page was properly setup for mods", () => {
  it("Should add script for loading cached tools", async () => {
    const Signup = Toolkit.build({
      toolId: Test.factories.mods.basic.key,
      tenantId: "a1b2c3d4",
    });
    expect(document.head.innerHTML).toContain(
      `src="https://cdn.anymod.com/v2/`
    );
  });
});
