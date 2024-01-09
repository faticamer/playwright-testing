<div align="center">
  <h1> Playwright Automation Framework (POM) </h1>
  <img src="https://img.shields.io/badge/release-0.1.1-orange" alt="version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="license MIT">
</div>
This framework is designed and built to enable cross-browser web automation. It supports Node.js, Python, Java and .NET

## Built With

- [Playwright](https://playwright.dev)
- [Typescript](https://www.typescriptlang.org/)

## Prerequisites

- [Node.js](https://nodejs.org/en)
- [Visual Studio Code](https://code.visualstudio.com/)

## Installation

Directory and package setup
- Navigate to the project directory inside your terminal and run:
```bash
npm init playwright@latest
```

After running the command, you will be offered to install Playwright Browsers.
Or, you can do it manually:
```bash
npx playwright install
```

Configure Typescript
- Within the same directory, run this command to generate tsconfig.json:
```bash
npx tsc --init
```

Before running tests, ensure that the test directory path is valid
- Locate playwright.config.ts file
- Find config and set testDir: './tests'

To run all tests, locate your package.json file and add script:
```bash
"test": "npx playwright test",
"test:reporter": "npx playwright test tests/fwkTesting.spec.ts --headed --reporter=allure-playwright",
"open:allure-report": "npx ./allure generate ./allure-results && allure open"
```

## Usage

To run all tests, run this command:
```bash
npm run test
```
This will run all tests inside the terminal and open the localhost port where report will be generated.

You can manually access the report by running this command:
```bash
npx playwright show-report
```

If you want to run a single test file, you can modify the command accordingly:
```bash
npx playwright test tests/{specfile_name.ts}
```
Make sure to remove curly braces when you specify the file name.

## Playwright's UI

If you want to open the Playwright's UI for running test, run this command:
```bash
npx playwright test --ui
```

## Contributions
This is a collaborative project, but PR's are welcome. For any major changes, please open an issue first to discuss what you would like to change.