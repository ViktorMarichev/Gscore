module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        extensions: [".ts", ".tsx", ".js", ".ios.js", ".android.js"],
        alias: {
          "@components": "./asset/components",
          "@svg": "./asset/svg",
          "@types": "./asset/types",
        },
      },
    ],
    [
      "styled-components",
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
  ],
};
