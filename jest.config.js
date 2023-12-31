module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"],
  collectCoverageFrom: ["src/utils/**/*.{js,vue}"],
  coverageDirectory: "<rootDir>/tests/unit/coverage",
  collectCoverage: true,
  coverageReporters: ["lcov", "text-summary"],
  testURL: "http://localhost/",
  transformIgnorePatterns: ["node_modules/(?!axios|module2|etc)"],
};
