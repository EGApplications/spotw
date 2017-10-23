#!/usr/bin/expect -f

set USER "PavelN"
set PATH "/var/spotw"

set HOST "185.98.87.26"
set PASSWORD "epidemicpassword"

spawn ssh $USER@$HOST;
expect "PavelN@185.98.87.26's password:";
send "cd $PASSWORD\r";
expect "$*";
send "cd $PATH\r";
expect "$*";
send "git pull\r";
expect "$*";
send "forever restart app.js";
expect "$*";
send "exit\n"








