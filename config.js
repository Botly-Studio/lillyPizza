#!/usr/bin/env node

const config = {
    port: 3000,
    log: false,
    origins: [
        'http://beta.botly-studio.fr',
        'http://localhost:8080'
    ],
    compileScriptPath: "/opt/compiler/compile.sh"
};

module.exports = config;