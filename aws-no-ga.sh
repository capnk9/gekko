#!/bin/bash -x
sudo apt update && sudo apt upgrade -y
# Install Nodejs
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install -y nodejs
# Mount AWS Gekko Volume
sudo mkdir /steve &&
sudo mount /dev/nvme1n1 /steve
# Install Gekko
cd /steve/gekko
sudo npm install --only=production
sudo npm install convnetjs mathjs
sudo apt-get install -y build-essential
sudo npm install --unsafe-perm tulind

cd /steve/gekko/history
sudo rm *
wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=1BuNzf_KzVXMVSOcGwOJsa2o99XHGUXiy' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1BuNzf_KzVXMVSOcGwOJsa2o99XHGUXiy" -O Bitfinex.zip && rm -rf /tmp/cookies.txt
sudo apt install -y unzip
sudo unzip Poloniex.zip && rm Poloniex.zip

https://drive.google.com/open?id=1BuNzf_KzVXMVSOcGwOJsa2o99XHGUXiy