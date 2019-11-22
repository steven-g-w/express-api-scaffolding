module.exports = {
  globals: {
      "ts-jest": {
          tsConfig: "tsconfig.json"
      }
  },
  moduleFileExtensions: [
      "js"
  ],
  transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: [
      "**/test/**/*.spec.(ts|js)"
  ],
  testEnvironment: "node"
};
