#!/bin/sh

DOMAIN="$1"

# require TLS certificate for domain
certbot run -d "$DOMAIN" --server https://ca.nasa.nycu:9000/acme/acme/directory

# restart nginx
service nginx reload
service nginx restart
