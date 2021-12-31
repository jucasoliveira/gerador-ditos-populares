import path from "path";
import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer";
import { DefaultTheme, RandomBgColor } from "../types/themes.enum.js";
import { openSync, closeSync } from "fs";
import fs from "fs";

const CLI_DEFAULT_OUTPUT = path.resolve("screenshots");

const CARBON_BASE_PATH = "https://carbon.now.sh/";
const CARBON_HTML_SELECTOR = "div.container-bg";
const CARBON_DEFAULT_THEME = DefaultTheme;

const getFileName = () => {
  return [new Date().toISOString().split(":").join("-"), "png"].join(".");
};

const parseParameters = (params) => {
  return {
    code: params.code,
    language: params.language,
    theme: params.theme || CARBON_DEFAULT_THEME,
    output: params.output || CLI_DEFAULT_OUTPUT,
  };
};

const convertParamsToQuery = (params) => {
  const paramsMap = new Map();
  paramsMap.set("bg", RandomBgColor());
  paramsMap.set("t", params.theme);
  paramsMap.set("l", params.language);
  paramsMap.set("code", params.code);

  const paramsList = [];
  for (const [key, value] of paramsMap.entries()) {
    paramsList.push(`${key}=${encodeURIComponent(value)}`);
  }

  return paramsList.join("&");
};

const getScreenshot = async (params) => {
  const carbonParsedParameters = parseParameters(params);

  if (!fs.existsSync(carbonParsedParameters.output)) {
    fs.mkdirSync(carbonParsedParameters.output);
  } else {
    fs.rmdirSync(carbonParsedParameters.output, {
      recursive: true,
      force: true,
    });
    fs.mkdirSync(carbonParsedParameters.output);
  }

  //const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  const carbonQueryString = convertParamsToQuery(carbonParsedParameters);
  const carbonFullPath = [CARBON_BASE_PATH, carbonQueryString].join("?");

  await page.goto(carbonFullPath);
  const targetElement = await page.$(CARBON_HTML_SELECTOR);
  let screenshotPath;
  if (targetElement) {
    const OUTPUT_PATH = path.join(carbonParsedParameters.output, getFileName());

    closeSync(openSync(OUTPUT_PATH, "a"));
    await targetElement.screenshot({
      path: OUTPUT_PATH,
    });

    screenshotPath = OUTPUT_PATH;
  } else {
    throw new Error(
      `Unable to find ${CARBON_HTML_SELECTOR} while trying to get a screenshot`
    );
  }

  await browser.close();

  return screenshotPath;
};

export default getScreenshot;
