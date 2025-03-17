#!/bin/bash

# Check if Git username is set, if not ask for it
if ! git config --global user.name > /dev/null 2>&1; then
  echo "Enter your Git username:"
  read username
  git config --global user.name "$username"
fi

# Check if Git email is set, if not ask for it
if ! git config --global user.email > /dev/null 2>&1; then
  echo "Enter your Git email:"
  read email
  git config --global user.email "$email"
fi

echo "Git configuration set!"
