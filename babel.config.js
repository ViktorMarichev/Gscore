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
          "@api": "./asset/redux/api",
        },
      },
    ],
  ],
};
