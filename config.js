#!/usr/bin/env node

const config = {
    port: 80,
    log: true,
    origins: [
        'http://beta.botly-studio.fr',
		'https://botly-studio.fr',
        'http://localhost:8080'
    ],
    compileScriptPath: "/opt/lillyPizza/compile.sh",
    compiledSketchPath: "/opt/lillyPizza/sketch/sketch.arduino.avr.LilyPadUSB.hex"
};

module.exports = config;
