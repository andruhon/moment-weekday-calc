1. Update bower.json and package.json

2. Build the project:

  npm run build

this will run grunt-cli

3. Commit changes

4. Push a tag  

>git tag -a 1.0.5 -m'1.0.5 release descr'  
>git push origin 1.0.5

or create a patch with npm

  npm version patch

which will create a new tag (don't forget to push it)

5. Do a release on github:  
tags->Add release notes onto latest

6. npm publish

7. the last tag is released to bower automatically
