#!/usr/bin/expect

set timeout 20

set user [lindex $argv 0]

set password [lindex $argv 1]

spawn sudo mosquitto_passwd -c /etc/mosquitto/passwd $user

set timeout -1

expect "Password:"

send "$password\r";

expect "Reenter password:"

send "$password\r";

exec sudo systemctl restart mosquitto