#!/bin/bash
set -x
set -e

echo $PATH

INSTALL_DIR="$HOME/.local/lib/aws"

echo $INSTALL_DIR/bin/aws

if [ ! -e "$INSTALL_DIR/bin/aws" ];then
  wget https://s3.amazonaws.com/aws-cli/awscli-bundle.zip
  unzip awscli-bundle.zip
  ./awscli-bundle/install -b ~/bin/aws
fi

ln -sf "$INSTALL_DIR/bin/aws" ~/bin/aws


