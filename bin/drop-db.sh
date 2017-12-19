#!/usr/bin/env bash

source "$PWD/bin/helpers/mysql.sh"

assert_connection

$MYSQL -u $USER -h $HOST -e "DROP DATABASE $DB;" &>/dev/null

if [ $? -ne 0 ]; then
  echo "Error: could not drop database!"
  sleep 1
  exit 2
fi

echo "Done"
