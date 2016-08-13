# Carvis

> Pithy project description

## Team

Built by @alexcstark, @cpruijsen, @daredia, @JasonArkens17 as our final project @hackreactor .

## Stack

Built using Node, Express, React, PostgreSQL with Redux, React-Router and Redis.

Deployment: Docker, AWS EC2, AWS Lambda.
Build tools: NPM scripting, Webpack, ESlint.
Testing: TravisCI, Mocha, Chai, Karma.

APIs: Uber, Lyft, Google Places, Twilio.
Client side: web app and Amazon Alexa Skill.

Tools used for reverse-engineering: Charles Proxy, APKtool, APK extractor, SSL Kill Switch 2, Cydia.

### Installing Dependencies

From within the root directory:
```sh
npm install
```

If you're a member of the Complex-Joins team, update your secret config (create an empty file /secret/config.js first if you haven't already):
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

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
