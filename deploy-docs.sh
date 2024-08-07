#!/bin/bash

RED='\e[1;41m'
GREEN='\e[1;42m'
NC='\033[0m' # No Color

SSH_USER=$1
SSH_HOST=$2
SSH_PATH='./web/'

if ! echo "$SSH_USER" | grep -q "bma"; then
	echo -e "${RED}The SSH_USER seems to be different then the required${NC}"
    exit 1
fi

echo $'\n' "Checking missing docs" $'\n'
yarn docs:missing

PREV_STEP=1

if [ $PREV_STEP -eq 1 ];then
  echo $'\n' "Run docs:build to generate docs:dist files" $'\n'
  yarn docs:build
  if [ $? -eq 0 ]; then
    echo -e $'\n' "${GREEN} \u2714 Docs generated ${NC}" $'\n'
    PREV_STEP=1
  else
    echo -e $'\n' "${RED} \u2a2f Docs generation failed ${NC}" $'\n'
    PREV_STEP=0
  fi
fi

if [ $PREV_STEP -eq 1 ];then
    echo $'\n' "Copy docs:dist folder to server" $'\n'
    rsync --progress -azh \
        --delete --exclude='error/' --exclude='stats/' --exclude='.htaccess' --exclude='robots.txt' \
        ./docs/.vitepress/dist/ \
        -e "ssh -i /home/rrd/.ssh/vmd_webmania" \
        $SSH_USER@$SSH_HOST:$SSH_PATH

    if [ $? -eq 0 ]; then
        echo -e $'\n' "${GREEN} \u2714 docs:dist folder uploaded ${NC}" $'\n'
    else
        echo -e $'\n' "${RED} \u2a2f docs:dist folder upload failed ${NC}" $'\n'
        PREV_STEP=0
    fi
fi