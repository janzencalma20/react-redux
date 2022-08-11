# Cohere Frontend

## Requirements
An environment file (.env) is required to run this repository. It needs to be copied into the repository root directory. 

If you don't have access to any of the resources in this section, please contact [kevin.bersch@electricalcoolingsolutions.com]().

## Installation
The following instructions are valid for Linux. Syntax might differ on Windows and MacOS. 
- Clone repository: `git clone https://github.com/electricalcoolingsolutions/Cohere_Frontend`
- Install node: `sudo apt install nodejs`
- Install npm: `sudo apt install npm`
- Install packages (from repository root directory): `npm install`

## Execution
- Run (development): `npm start`
- Build (for deployment): `npm run build`

## Switch node versions
It is possible that a different node version to the default version in the apt repositories is required. To install and switch node versions, follow the following steps (example is done for v14.17.6):
- Install n: `sudo npm install -g n`
- Install or switch to additional node version: `n 14.17.6`