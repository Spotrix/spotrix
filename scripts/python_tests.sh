#!/usr/bin/env bash

#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
set -e

# Initialize the database
echo "1" "Starting" "Applying DB migrations"
spotrix db upgrade
echo "1" "Complete" "Applying DB migrations"

# Create an admin user
echo "2" "Starting" "Setting up admin user "
spotrix fab create-admin \
              --username admin \
              --firstname Spotrix \
              --lastname Admin \
              --email bqjimaster@gmail.com \
              --password admin
echo "2" "Complete" "Setting up admin user"
# Create default roles and permissions
echo "3" "Starting" "Setting up roles and perms"
spotrix init
echo "3" "Complete" "Setting up roles and perms"
