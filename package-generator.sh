#!/bin/bash

# Colors
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Ask for the package type
read -p "$(echo -e "${CYAN}Enter the package type (nest/native):${NC} ")" package_type

# Validate package type
if [[ "$package_type" != "nest" && "$package_type" != "native" ]]; then
  echo "Invalid package type. Allowed values are 'nest' or 'native'."
  exit 1
fi

# Ask for the package name
read -p "$(echo -e "${CYAN}Enter the package name:${NC} ")" package_name

if [[ "$package_type" == "nest" ]]; then
  # Capitalize the first letter of the package name
  package_name_capitalized="$(tr '[:lower:]' '[:upper:]' <<< ${package_name:0:1})${package_name:1}"

  # Create nest folder if it doesn't exist
  mkdir -p nest

  # Navigate to the nest folder
  cd nest

  # Create folder structure
  mkdir -p "$package_name/src"

  # Create NestJS module file
  cat > "$package_name/src/${package_name}.module.ts" <<EOL
import { Module } from '@nestjs/common';
import { ${package_name_capitalized}Service } from './${package_name}.service';

@Module({
  providers: [${package_name_capitalized}Service],
  exports: [${package_name_capitalized}Service],
})
export class ${package_name_capitalized}Module {}
EOL

  # Create NestJS service file
  cat > "$package_name/src/${package_name}.service.ts" <<EOL
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${package_name_capitalized}Service {
  // Add your service code here
}
EOL

  # Create NestJS service spec file
  cat > "$package_name/src/${package_name}.service.spec.ts" <<EOL
import { Test, TestingModule } from '@nestjs/testing';
import { ${package_name_capitalized}Service } from './${package_name}.service';

describe('${package_name_capitalized}Service', () => {
  let service: ${package_name_capitalized}Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [${package_name_capitalized}Service],
    }).compile();

    service = module.get<${package_name_capitalized}Service>(${package_name_capitalized}Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
EOL

  # Create index.ts file
  echo "export { ${package_name_capitalized}Module } from './${package_name}.module';" > "$package_name/src/index.ts"
  echo "export { ${package_name_capitalized}Service } from './${package_name}.service';" >> "$package_name/src/index.ts"

  # Create package.json
  cat > "$package_name/package.json" <<EOL
{
  "name": "$package_name",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "scripts": {
    "build": "nest build",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@nestjs/testing": "^10.0.4",
    "@nestjs/common": "^10.0.0",
    "@types/jest": "^29.5.2",
    "jest": "^29.5.0",
    "nest": "^0.1.6",
    "ts-jest": "29.0.5",
    "ts-loader": "^9.2.3",
    "ts-node": "^10.0.0"
  },
  "dependencies": {
    "@paralleldrive/cuid2": "^2.2.1"
  },
    "jest": {
      "moduleFileExtensions": [
        "js",
        "json",
        "ts"
      ],
      "rootDir": "src",
      "testRegex": ".*\\\\.spec\\\\.ts$",
      "transform": {
        "^.+\\\\.(t|j)s$": "ts-jest"
      },
      "collectCoverageFrom": [
        "**/*.(t|j)s"
      ],
      "coverageDirectory": "../coverage",
      "testEnvironment": "node"
    }
}
EOL

  # Create tsconfig.json
  cat > "$package_name/tsconfig.json" <<EOL
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  },
  "exclude": ["node_modules", "**/*spec.ts"]
}
EOL

  echo "NestJS package '$package_name' has been created under the 'nest' folder."
  cd $package_name
  echo -e "${CYAN}Executing additional steps:${NC}"
  echo -e "1. Running 'npm install'"
  npm install
  echo -e "2. Running 'npm run build'"
  npm run build
  echo -e "3. Running 'npm run test'"
  npm run test
    echo "NestJS package '$package_name' is ready to use!"

else
  echo "Package type '$package_type' is not supported yet."
fi
