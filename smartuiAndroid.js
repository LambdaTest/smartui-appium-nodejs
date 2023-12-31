const wd = require("wd");

/**
 * Username to be used for running the test.
 */
const username = process.env.LT_USERNAME || "YOUR_LT_USERNAME";

/**
 * The access key to be used for running test test.
 */
const accessKey = process.env.LT_ACCESS_KEY || "YOUR_LT_ACCESS_KEY";

/**
 * Capabilities to be passed while running the test.
 */
const desiredCapabilities = {
  app: "lt://proverbial-android",  // Enter the app_url here
  build: "NodeJS - Android_App",
  name: "Sample Test NodeJS-Android",
  deviceName: "Galaxy S20",
  isRealMobile: true,
  platformName: "android",
  platformVersion: "11",
  video: true,
  visual: true,
  "smartUI.project": "Real-Device-Project-Android", // Enter your smartUI Project name
};

const driver = wd.promiseRemote(
  `https://${username}:${accessKey}@mobile-hub.lambdatest.com/wd/hub`
);

const DEFAULT_TIMEOUT = 10000;

/**
 * Run an Android test.
 */
async function runSmartuiAndroidTest() {
  try {
    await driver.init(desiredCapabilities);

    await driver.waitForElementById("color", DEFAULT_TIMEOUT);
    await (await driver.elementById("color"));

    await driver.waitForElementById("Text", DEFAULT_TIMEOUT);
    await (await driver.elementById("Text"));

    await driver.waitForElementById("toast", DEFAULT_TIMEOUT);
    await (await driver.elementById("toast"));

    await driver.execute(`smartui.takeScreenshot=<Name of your Screenshot>`);
    console.log("Screenshot Captured");
    // Quit driver after successful execution
    await driver.quit();
    console.log("Driver quit successfully.");

  } catch (e) {
    console.error(e);
    // Quit driver in case of error
    await driver.quit();
    console.log("Driver quit after error.");
  }
}

runSmartuiAndroidTest();