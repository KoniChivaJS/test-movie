#!/bin/sh
# env.sh

for i in $(env | grep REACT_APP_); do
  key=$(echo $i | cut -d '=' -f 1)
  value=$(echo $i | cut -d '=' -f 2-)
  echo "Replacing $key with $value"
  find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|$key|$value|g" '{}' +
done

echo "Environment variables injected"