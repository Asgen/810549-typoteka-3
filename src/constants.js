"use strict";

module.exports.MAX_ID_LENGTH = 4;
module.exports.DEFAULT_COMMAND = `--help`;
module.exports.USER_ARGV_INDEX = 2;
module.exports.ExitCode = {
  success: 0,
};

module.exports.HttpCode = {
  OK: 200,
  INVALID_DATA: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401
};

module.exports.REQUIRED_FIELDS = [
  `title`,
  `category`,
  `announce`,
  `fullText`
];

module.exports.USER_ROLES = [
  `автор`,
  `читатель`
];

module.exports.API_PREFIX = `/api`;
