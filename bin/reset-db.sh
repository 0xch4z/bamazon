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
    # exclude knex resources
    [[ $t == knex* ]] && continue

    echo "resetting \"$t\"..."
    $MYSQL -u $USER -h $HOST $DB -e "DELETE FROM $t;"

    if [ $? -ne 0 ]; then
      echo "Error: could not reset table $t!"
    fi

  done
else
  echo "No tables to reset!"
fi

echo "Done."
