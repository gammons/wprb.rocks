#!/bin/bash

_now=`date +"%Y-%m-%d-%H"`
_file="ultralist-$_now.gz"
mysqldump -u $MYSQL_USER --password=$MYSQL_PASSWORD -h $MYSQL_HOST ultralist | gzip -c > "$_file"
aws s3 cp "$_file" s3://ultralist-prod-db-backup/"$_file"
