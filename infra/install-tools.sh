#!/bin/bash
# Copyright (c) 2021 eContriver LLC
# Run with persisten volume mount, so these tools don't need to be reinstalled
#   docker run -v C:\Users\admin\JS_WASD_Game.opt:/opt/ ...

set -e

# TOOL_NAME=code_1.52.1
# URL=https://az764295.vo.msecnd.net/stable/ea3859d4ba2f3e577a159bc91e3074c5d85c0523/${TOOL_NAME}-1608136922_amd64.deb
# DEST=/opt/${TOOL_NAME}.deb
# if [ ! -f "$DEST" ]
# then
#   echo "Downloading '${TOOL_NAME}' from '${URL}'"
#   curl $URL > $DEST
#   apt install -y $DEST
# else
#   echo "Found existing file '${DEST}' - skipping download"
# fi

copy_file() {
  CONFIG_FILE=$1
  SRC=/JS_WASD_Game/infra/${CONFIG_FILE}
  DEST=${2}/${CONFIG_FILE}
  if [ ! -f "$DEST" ]
  then
    echo "Copying '${SRC}' to '${DEST}'"
    cp $SRC $DEST
  else
    echo "Found existing file '${DEST}' - skipping copy"
  fi
} 

copy_dir() {
  CONFIG_DIR=$1
  SRC=/JS_WASD_Game/infra/${CONFIG_DIR}
  DEST=${2}/${CONFIG_DIR}
  if [ ! -d "$DEST" ]
  then
    echo "Copying '${SRC}' to '${DEST}'"
    cp -r $SRC $DEST
  else
    echo "Found existing directory '${DEST}' - skipping copy"
  fi
} 

HOMES=(/root /home/vscode)
for THIS_HOME in "${HOMES[@]}"
do
  copy_file .vimrc ${THIS_HOME}
  copy_dir .vim ${THIS_HOME}
done