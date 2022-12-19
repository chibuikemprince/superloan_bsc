"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
const pusher_1 = __importDefault(require("pusher"));
const errorReporting_1 = require("./errorReporting");
const PusherKey = (0, env_1.getEnv)("PUSHER_KEY");
const PusherAppId = (0, env_1.getEnv)("PUSHER_APP_ID");
const PusherSecret = (0, env_1.getEnv)("PUSHER_SECRET");
const PusherCluster = (0, env_1.getEnv)("PUSHER_CLUSTER");
const pusher = new pusher_1.default({
    appId: PusherAppId,
    key: PusherKey,
    secret: PusherSecret,
    cluster: PusherCluster,
    useTLS: true
});
class PusherHelpers {
    send_event(eventName, data) {
        return new Promise((resolve, reject) => {
            try {
                pusher.trigger("vetting_test", eventName, {
                    data,
                    time: Date.now()
                })
                    .then((pushed) => {
                    console.log({ /* pushed, */ msg: eventName + " pusher done", data });
                    resolve(true);
                    return;
                })
                    .catch((err) => {
                    let error_log = {
                        msg: 'error found in pusher sent event.',
                        time: new Date().toDateString(),
                        status: 'MILD',
                        stack: err.stack,
                        class: this
                    };
                    (0, errorReporting_1.LogError)(error_log);
                    reject(false);
                    return;
                });
            }
            catch (err) {
                let error_log = {
                    msg: 'error found in pusher sent event.',
                    time: new Date().toDateString(),
                    status: 'MILD',
                    stack: err.stack,
                    class: this
                };
                (0, errorReporting_1.LogError)(error_log);
                reject(false);
            }
        });
    }
}
exports.default = new PusherHelpers();
