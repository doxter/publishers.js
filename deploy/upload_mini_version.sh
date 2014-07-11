#!/bin/bash
set -x
set -e



awscli="$HOME/.local/lib/aws/bin/aws"


grunt=`which grunt`

grunt build

UPLOAD='dest/doxter_publisher.min.js'
FILENAME='doxter_publisher.min.js'
chmod 444 $UPLOAD

if [ -n "$UPLOAD" ]; then


  $awscli s3 --region=eu-west-1 cp $UPLOAD s3://js.doxter.de --acl public-read

fi



