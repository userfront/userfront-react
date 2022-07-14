const React = require("react");

const expectedReactVersion = `${process.env.REACT_VERSION}` || "18";

if (!React.version.startsWith(expectedReactVersion)) {
  throw new Error(`Wrong React version. Expected ^${expectedReactVersion}, got ${React.version}`)
}