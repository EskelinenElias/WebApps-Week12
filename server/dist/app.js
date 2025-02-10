"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./config/db"));
// Configure environment
dotenv_1.default.config();
// Initialize app
const app = (0, express_1.default)();
// Add middleware
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Add routing
app.use("/", routes_1.default);
// Confifure Cross-Origin Resource Sharing (CORS)
if (process.env.NODE_ENV === 'development') {
    const corsOptions = {
        origin: 'http://localhost: 3000',
        optionsSuccessStatus: 200
    };
    app.use((0, cors_1.default)(corsOptions));
}
else if (process.env.NODE_ENV === 'production') {
    // Serve static files from client/build
    app.use(express_1.default.static(path_1.default.resolve('../..', 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve('../..', 'client', 'build', 'index.html'));
    });
}
// Configure server settings
const host = "127.0.0.1";
const port = 1234;
// Serve static files
// app.use(express.static(path.join(__dirname, "../public")));
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
