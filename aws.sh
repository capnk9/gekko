#!/bin/bash -x
sudo apt update && sudo apt upgrade -y
#sudo apt-get install hibagent && /usr/bin/enable-ec2-spot-hibernation
# Install Python
sudo add-apt-repository ppa:jonathonf/python-3.6 -y
sudo apt update
sudo apt install -y python3.6
sudo apt install -y python3.6-dev
sudo apt install -y python3.6-tk
sudo apt install -y python3-distutils
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
sudo python3.6 get-pip.py
cd /usr/lib/python3/dist-packages
sudo cp apt_pkg.cpython-35m-x86_64-linux-gnu.so apt_pkg.so
sudo pip3 install dash_renderer
# Install Nodejs
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install -y nodejs
# Mount AWS Gekko Volume
sudo mkdir /steve &&
sudo mount /dev/xvdf /steve
# Install Gekko
cd /steve/gekko
sudo npm install --only=production
sudo npm install convnetjs mathjs
sudo apt-get install -y build-essential
sudo npm install --unsafe-perm tulind
# Install Japonicus
cd /steve/gekko/japonicus
sudo pip3 install deap-1.0.2.post2.tar.gz
sudo pip3 install -r requirements.txt

echo "Complete!"
echo "python3.6 japonicus.py -g --strat neuralnet_zschro"

#wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=1ZsjzOV4c2M36IxQg5x7DOminZz1vaLwo' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1ZsjzOV4c2M36IxQg5x7DOminZz1vaLwo" -O Bitfinex.zip && rm -rf /tmp/cookies.txt

#sudo systemctl start gekko
