# monaorepo
my opinion based mono repo for shared libraries 
i only wanted to build stanalone liberies, run tests and publish 
without any fancy stuff.

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
