"use strict";

const MAX_ID_LENGTH = 4;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  success: 0,
};

const HttpCode = {
  OK: 200,
  INVALID_DATA: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401
};

const REQUIRED_FIELDS = [
  `title`,
  `category`,
  `announce`,
  `fullText`
];

const USER_ROLES = [
  `автор`,
  `читатель`
];


module.exports = {MAX_ID_LENGTH, DEFAULT_COMMAND, USER_ARGV_INDEX, ExitCode, HttpCode, REQUIRED_FIELDS, USER_ROLES};
