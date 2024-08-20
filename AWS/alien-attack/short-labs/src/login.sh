#!/bin/bash
# This script performs a log-in on a Cognito User Pool that has the USER_PASSWORD_AUTH flow enabled
# It requires the following environment variables be already defined
# - CLIENT_ID: The App Client ID associated to a certain user pool
# The script will capture the token ID and store it in the ID_TOKEN environment variable
if [ "$CLIENT_ID" == "" ]; then
    echo "CLIENT_ID not defined. The environment variable CLIENT_ID must contain a valid Cognito User Pool Client ID"
fi
OLD_TOKEN=$ACCESS_TOKEN
if  [ "$OLD_TOKEN" == "" ]; then
    OLD_TOKEN=$(grep Authorization ./cognito-group-authorizer/__tests__/events/request.json | awk -F ":" 'FNR == 1 { print $2}' | sed 's/"//g ; s/,//g ; s/ //g')
fi
read -p "Enter username: " USER_NAME
read -p "Enter password: " -s USER_PASSWORD
export AUTHENTICATION_RESULT=($(aws cognito-idp initiate-auth --auth-flow USER_PASSWORD_AUTH --client-id $CLIENT_ID --auth-parameters USERNAME="$USER_NAME",PASSWORD="$USER_PASSWORD" --region $REGION --output text))
export ACCESS_TOKEN=${AUTHENTICATION_RESULT[1]}
export EXPIRES_IN=${AUTHENTICATION_RESULT[2]}
export ID_TOKEN=${AUTHENTICATION_RESULT[3]}
export REFRESH_TOKEN=${AUTHENTICATION_RESULT[4]}
echo ""
if [ "$ACCESS_TOKEN" != "" ]; then
    export OLD_TOKEN
    echo "---"
    echo "OLD TOKEN: $OLD_TOKEN"
    echo "---"
    echo "NEW TOKEN: $ACCESS_TOKEN"
    echo "---"
    echo "UPDATING THE EVENT FILES"
    find -P ~/environment/cognito-group-authorizer/__tests__/events -name '*.json' -type f -exec bash -c '
        echo " Updating $1"
        sed -i "s|$2|$3|g" "$1"
    ' bash {} $OLD_TOKEN $ACCESS_TOKEN \;
else
    echo Error capturing the token
fi