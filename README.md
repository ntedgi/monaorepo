# monaorepo
my opinion based mono repo for shared libraries 
i only wanted to build stanalone liberies, run tests and publish 
without any fancy stuff.

## How to start?
after using this template 
change root package.json name (@monaorepo) property to your [Scope](https://docs.npmjs.com/cli/v9/using-npm/scope)

to genrate liberaries run `npm i` in the root directory
then run `npm run genreate` to genrate the liberaries
need to pass 2 arguments to the script
1. liberary name [string]
2. liberary type [nest | basic]

the liberary name genrate from : `<scope>/<type>-<name>`

`scope`: root package.json name field and @ prefix

for example : `npm run genreate nest http-client`
this will create a new libery template
with the name `@monaorepo/nest-http-client`

## How to publish libery:
go to your package dir :

* make some changes
* write unit tests
* commit your changes
* run [npm version](https://docs.npmjs.com/cli/v7/commands/npm-version) command for example:  `npm version patch`
* npm build
* npm publish
 


## File Structure:
### Nest 
 will genrate a nestjs liberary with this file sturcture
```
.
├── package.json
├── tsconfig.json
├── src                   
│   ├── index.ts         
│   ├── template.module.ts        
│   ├── template.service.ts        
│   └── template.service.spec.ts              
└── ...
```
the template already setup with jest test runner 
and package.json with the following scripts

```
"build": "nest build",          #(build liberary)
"test": "jest",                 #(run tests)
"test:watch": "jest --watch",   #(hot reload for tests)
"test:cov": "jest --coverage"   #(test coverage)
```

### Basic
 will genrate a basic liberary with this file sturcture
``` 
.   
├── package.json
├── tsconfig.json
├── src
│   ├── index.ts
│   └── template.ts
└── ...
```


### CI

this template already setup with github actions for CI
the workflow will run on every push to master branch
and will run the following steps:
1. checkout
2. setup node
3. install dependencies
4. run tests
5. build liberary

commit -> Job 1 which packages changed: [kafka1 mysql2]
