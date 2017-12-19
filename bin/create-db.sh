#!/usr/bin/env bash

source "$PWD/bin/helpers/mysql.sh"

$MYSQL -u $USER -h $HOST -e "DROP DATABASE IF EXISTS $DB; CREATE DATABASE $DB;" &>/dev/null

if [ $? -ne 0 ]; then
  echo "Error: could not create database!"
  sleep 1
  exit 2
fi

echo "Done."
