"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./config/db"));
// Initialize app
const app = (0, express_1.default)();
// Add middleware
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Add routing
app.use("/", routes_1.default);
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// Configure server settings
const host = "127.0.0.1";
const port = 3000;
// Configure database settings
const dbAddress = "mongodb://127.0.0.1:27017/testdb";
// Connect to database
(0, db_1.default)(dbAddress).then(() => {
    console.log(`Connected to database at ${dbAddress}`);
    // Start the server
    app.listen(port, () => {
        console.log(`Server running at http://${host}:${port}/`);
    });
});
