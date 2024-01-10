import { environment } from "src/environments/environment";

/* eslint-disable @typescript-eslint/naming-convention */
export const CONSTANTS = {

  message: {
    INITIAL: 'Please enter search criteria and hit search button.',
    INTERNAL_ERROR: 'Oops Something went wrong..!',
    INTERNAL_SERVER_ERROR: 'Oops Internal Server error..!',
    NETWORK_ERROR: 'Oops! Connection/Network error..!'
  },

  errorCodes: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND_HTTP_EXCEPTION: 404,
    PERMISSION_DENIED: 404,
    METHOD_NOT_FOUND: 405,
    ALREADY_EXISTS: 406,
    DATABASE_INITIALIZATION_FAIL: 407,
    ERROR_CODE_VALIDATION_FAILED: 422,
    INVALID_DOMAIN: 433,
    TOKEN_EXPIRED: 466,
    TOKEN_REQUIRED: 477,
    INTERNAL_SERVER_ERROR: 500
  },

  userDefaultImage: './assets/images/profile.jpg',
  defaultImage: './assets/images/dummy-image.jpg',
  importUsersDemoUrl: 'global/importusers.csv',

  baseImageURL: environment.baseImageURL,
  appUrl: environment.appURL,

  languagesJSONFileName: {
    US_ENGLISH: 'us-english',
    EUROPE_FRENCH: 'ep-french',
    INDIA_HINDI: 'in-hindi',
    INDIA_GUJARATI: 'in-gujarati',
    GERMANY_GERMAN: 'ge-german',
    CHINA_MANDARIN: 'ch-mandarin',
    THAILAND_THAI: 'th-thai'
  },
};