const Promise = require("es6-promise").Promise;
const factories = require("../factories/index.js");
if (jest) jest.useFakeTimers();

const Test = {
  factories,
  fns: {},
};

Test.fns.defineAnyModPage = (w) => {
  w.AnyMod = {
    Page: {
      page: {},
      mountedModObjs: {},
      unmountedEls: [],
      modsWithRemainingAssets: [],
      modsWithoutRemainingAssets: [],
      mapMmos(cb) {
        if (!cb || typeof cb !== "function") return;
        this.mountedIds().map((id) => cb(this.mountedModObjs[id]));
      },
      mountedIds() {
        return Object.keys(this.mountedModObjs);
      },
    },
    Version: {
      currentVersion: "default",
    },
    Opts: {},
    Promise,
    ready(cb) {
      if (cb && typeof cb === "function") cb();
      return Promise.resolve();
    },
  };
  w.AnyModPageJs = {};
};

Test.fns.fireAllScriptOnloads = (document) => {
  if (!document) return;
  const scripts = document.getElementsByTagName("script");
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].onload) scripts[i].onload();
  }
};

Test.fns.fireAllLinkOnloads = (document) => {
  if (!document) return;
  const links = document.getElementsByTagName("link");
  for (let i = 0; i < links.length; i++) {
    if (links[i].onload) links[i].onload();
  }
};

Test.fns.fireAllOnloads = (document) => {
  Test.fns.fireAllLinkOnloads(document);
  Test.fns.fireAllScriptOnloads(document);
  if (jest) jest.runAllTimers();
};

if (window) Test.fns.defineAnyModPage(global);

export { Test };
