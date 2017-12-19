#!/usr/bin/env bash

source "$PWD/bin/helpers/mysql.sh"

assert_connection

function inject_csv() {
  local CSV_PATH="$1"
  local TABLE="$2"
  local COLS="$3"

  EXEC="
    LOAD DATA INFILE '"$CSV_PATH"'
      INTO TABLE "$TABLE"
      COLUMNS TERMINATED BY ','
      ENCLOSED BY '\"'
      LINES TERMINATED BY '\n'
      ("$COLS");
  "
  
  $MYSQL -u $USER -h $HOST $DB -e "$EXEC" &>/dev/null
}

# inject data
function inject_data() {
  inject_csv "$PWD/bin/data/departments.csv" "Department" "name"
  inject_csv "$PWD/bin/data/products.csv" "Product" "name,price,initialCost,historicQuantity,quantity,departmentId"
}

inject_data

if [ $? -ne 0 ]; then
  echo "Error: could not inject dummy rows!"
  echo "You may need to disable \`secure-file-priv\` in \`~/my.cnf\`"
  echo ""
  echo "Run:"
  printf '\e[1;34m%-6s\e[m' "$ sudo echo \"secure-file-priv=\\\"\\\"\" > ~/my.cnf"
  echo ""
  echo "and restart mysql with:"
  printf '\e[1;34m%-6s\e[m' "$ brew services restart mysql"
  echo -e "\n"
  read -r -p "Want me to do this now? (requires sudo priv) [y/N]: " response
  if [[ "$response" =~ [yY](es)* ]]; then
    setup_priv
    inject_data
  else
    echo "Okay then."
    sleep 1
    exit 1
  fi
fi

echo "Done."
