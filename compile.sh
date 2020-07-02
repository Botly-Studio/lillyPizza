PATH=$PATH:/opt/compiler
arduino-cli compile \
--fqbn arduino:avr:LilyPadUSB \
--build-path /opt/lillypizza/build sketch
