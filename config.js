#!/usr/bin/env node
const config = {
  port: 3000,
  log : false,
  origin : 'http://localhost:8081',
  compileScriptPath : "/opt/lillyPizza/compile.sh"
};

module.exports = config;