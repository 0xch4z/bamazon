#!/usr/bin/env bash

source "$PWD/bin/helpers/mysql.sh"

assert_connection

TABLES=$(
  $MYSQL -u $USER -h $HOST $DB -e "SHOW TABLES;" |
    $AWK "{ print $1 }" |
    $GREP -v "^Tables"
)

if [ -n "$TABLES" ]; then
  for t in $TABLES; do
    echo "dropping \"$t\"..."
    $MYSQL -u $USER -h $HOST $DB -e "drop table $t"
    if [ $? -ne 0 ]; then
      echo "Error: could not drop table $t!"
    fi
  done
else
  echo "No tables to drop!"
fi

echo "Done."
