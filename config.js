#!/usr/bin/env node

const config = {
    port: 80,
    log: true,
    origins: [
		'http://botly-studio.fr',
        'http://localhost:8080'
    ],
    compileScriptPath: "/opt/lillypizza/compile.sh",
    compiledSketchPath: "/opt/lillypizza/sketch/build/arduino.avr.LilyPadUSB/sketch.ino.hex"
};

module.exports = config;
