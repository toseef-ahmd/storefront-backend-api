"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB, POSTGRES_TEST_USER, POSTGRES_TEST_PASSWORD, APP_ENV, } = process.env;
const Client = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: APP_ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
    user: APP_ENV === 'dev' ? POSTGRES_USER : POSTGRES_TEST_USER,
    password: APP_ENV === 'dev' ? POSTGRES_PASSWORD : POSTGRES_TEST_PASSWORD
});
//console.log("Client: ", Client)
exports.default = Client;
