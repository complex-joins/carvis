# Carvis
[![Build Status](https://travis-ci.org/complex-joins/carvis.svg?branch=master)](https://travis-ci.org/complex-joins/carvis) [![bitHound Overall Score](https://www.bithound.io/github/complex-joins/carvis/badges/score.svg)](https://www.bithound.io/github/complex-joins/carvis) [![bitHound Dependencies](https://www.bithound.io/github/complex-joins/carvis/badges/dependencies.svg)](https://www.bithound.io/github/complex-joins/carvis/master/dependencies/npm)

Your personal ride-share money saving servant! Get estimates and order the cheapest ride between Uber and Lyft. Also integrated with an [Amazon Alexa skill](https://github.com/complex-joins/alexa-poc) 

## Team

Built by `@alexcstark`, `@cpruijsen`, `@daredia`, `@JasonArkens17`.

## Stack

Built using Node, Express, React, PostgreSQL with Redux, React-Router and Redis.

Deployment: Docker, AWS EC2, AWS Lambda.
Build tools: NPM scripting, Webpack, ESlint.
Testing: TravisCI, Mocha, Chai, Karma.

APIs: Uber, Lyft, Google Places, Twilio.
Client side: web app and Amazon Alexa Skill.

Tools used for reverse-engineering: [Charles Proxy](https://www.charlesproxy.com/), [APKtool](https://ibotpeaches.github.io/Apktool/), [APK extractor](https://play.google.com/store/apps/details?id=com.ext.ui&hl=en), [SSL Kill Switch 2](https://github.com/nabla-c0d3/ssl-kill-switch2), [Cydia](https://cydia.saurik.com/).

## Possible challenges:
* Packet sniffing via MITM procedure.
* SSL pinning.
* Device rooting.
* Native iPhone/Andorid security.
* Reconstruction of end-points.
* Reconstruction of headers.
* Surge pricing.

### Installing Dependencies

From within the root directory:
```sh
npm install
```

If you're a member of the Complex-Joins team, update your secret config (create an empty file /secret/config.js first if you haven't already): ***These files contain the private/undocumented api endpoints uber and lyft’s apps use to communicate with their servers. You can find these yourself by reverse engineering their apps, or go through the approval flow to use their official api endpoints. Refer to the reverse engineering tools listed above.***
```sh
npm run setup
```


### Usage

Run the following command for hot building of front and back end
```sh
npm run start:dev
```


Run the following command for a static build
```sh
npm start
```

###Moving Forward

From here you will need to link to the [Carvis-api](https://github.com/complex-joins/carvis-api) or spin up your own server.
Also this repo does not include any of the Alexa Skill components of the application. For the Alexa Skill go [here](https://github.com/complex-joins/alexa-poc)
## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
