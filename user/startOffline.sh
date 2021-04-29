#!/usr/bin/env bash
TMPFILE=/var/tmp/offline$$.log
sls offline start --stage dev --seed=test &> $TMPFILE &
PID=$!
echo $PID > .offline.pid
while ! grep "server ready:" $TMPFILE
do sleep 1; done
rm $TMPFILE
