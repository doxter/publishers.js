#!/bin/bash
set -x
set -e



awscli="$HOME/.local/lib/aws/bin/aws"


grunt=`which grunt`

grunt build

UPLOAD='dest/publisher.min.js'
FILENAME='publisher.min.js'
chmod 444 $UPLOAD

if [ -n "$UPLOAD" ]; then


  $awscli s3 --region=eu-central-1 cp $UPLOAD s3://js.doctena.de --acl public-read

fi



