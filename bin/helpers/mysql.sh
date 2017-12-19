#!/usr/bin/env bash

# get bin paths
MYSQL=$(which mysql)
AWK=$(which awk)
GREP=$(which grep)
EX=$(which ex)

# constants
HOST="localhost"
USER="root"
DB="bamazon"
CNF=~/.my.cnf

# asserts can connect to db
function assert_connection() {
  INLINE=$1

  $MYSQL -u $USER -h $HOST -e "USE $DB;" &>/dev/null

  if [ $? -ne 0 ]; then
    if [ $INLINE ]; then
      echo 1
      return 1
    fi
    echo "Error: could not connect to $DB database!"
    sleep 1
    exit 2
  fi

  echo 0
}

function setup_priv() {
  # create conf file if needed
  [[ ! -f $CNF ]] && touch $CNF
  # add header group if needed
  [[ ! $($AWK '$0 $1' $CNF) = *"[mysqld]"* ]] && (
    echo "[mysqld]" > /tmp/tmp_priv_b &&
    echo "$(cat $CNF)" >> /tmp/tmp_priv_b &&
    cp /tmp/tmp_priv_b $CNF
  )
  # append priv col
  sudo echo "secure-file-priv=\"\"" >> $CNF
  # restart mysql
  brew services restart mysql
  echo "waiting for socket connection to mysql... (may take a while)"
  while [[ $( assert_connection true ) -ne 0 ]]; do
    sleep 1
  done
}

export MYSQL AWK GREP HOST USER DB
export -f assert_connection
export -f setup_priv
