#!/usr/bin/env bash

# set flags that ensure exit on failed command
set -e
set -o pipefail

npm install --global vercel 

vercel --cwd "apps/fna/" pull --yes --environment=$ENVIRONMENT --token=$VERCEL_TOKEN --scope $VERCEL_SCOPE

if [ "$ENVIRONMENT" == "production" ]; then
vercel build --prod --cwd "apps/fna/" --token=$VERCEL_TOKEN --scope $VERCEL_SCOPE
vercel deploy --prod --cwd "apps/fna/" --prebuilt  --token=$VERCEL_TOKEN --scope $VERCEL_SCOPE
else
vercel build --cwd "apps/fna/" --token=$VERCEL_TOKEN --scope $VERCEL_SCOPE
export DEPLOYMENT_URL=$(vercel deploy --prebuilt  --cwd "apps/fna/" --token=$VERCEL_TOKEN --scope $VERCEL_SCOPE)
export URL=$DEPLOYMENT_URL | sed 's/https\?:\/\///'
vercel alias set $URL $APP_URL --cwd "apps/fna/" -t $VERCEL_TOKEN --scope $VERCEL_SCOPE
fi