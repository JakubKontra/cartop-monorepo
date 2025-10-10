#!/bin/bash

# Checks whether the current commit should be deployed on Vercel. Exits with status 1 if the app
# should be redeployed, 0 when the build should be ignored.
#
# The script should be called from the respective package's working directory. It accepts the
# list of package dependencies as arguments. It will trigger a deployment whenever the package
# itself or any of its dependencies changes since the last deployment.

# https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
echo "VERCEL_ENV: $VERCEL_ENV"
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
echo "VERCEL_GIT_PREVIOUS_SHA: $VERCEL_GIT_PREVIOUS_SHA"

if [[ "$VERCEL_ENV" == "production" ]]
then
  echo "Deploying to production"
  exit 1
fi

if [[ "$VERCEL_GIT_COMMIT_REF" == "staging/"* ]]
then
  echo "Deploying to staging"
  exit 1
fi

if [[ -z $VERCEL_GIT_PREVIOUS_SHA ]]
then
  # When there is no previous deployment in this branch, check diff with previous commit
  gitFromPointer="HEAD^"
else
  gitFromPointer="$VERCEL_GIT_PREVIOUS_SHA"
fi

for i in $(eval echo "{0..$#}")
do
  if [[ $i == 0 ]]
  then
    package='.'
  else
    package="../${!i}"
  fi

  git diff $gitFromPointer HEAD --quiet "$package"

  if [[ $? == 1 || $? == 128 ]]
  then
    echo "$package has been changed, should deploy"
    exit 1
  fi
done

echo "No changes detected"
