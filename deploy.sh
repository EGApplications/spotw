#!/usr/bin/expect -f

set USER "PavelN"
set PATH "/var/spotw"

set HOST "185.98.87.26"
set PASSWORD "epidemicpassword"

spawn ssh $USER@$HOST;
expect "assword:";
send "$PASSWORD\r";
expect "#*";
send "cd $PATH\r";
expect "#*";
send "git pull\r";
expect "#*";
send "forever restart app.js\r";
expect "#*";
send "exit\n"








