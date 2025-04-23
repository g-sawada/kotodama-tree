#!/bin/sh
set -e

rm -f /app/tmp/pids/server.pid
bin/rails db:prepare
# bin/rails db:seed:replant

exec "$@"