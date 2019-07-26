#!/usr/bin/env node
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs-extra');
const path = require('path');
const https = require('https');
const { exec } = require('child_process');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const existing_package_json = require('../package.json');

const scripts = `"build": "webpack --mode production",
    "watch": "webpack --watch",
    "start": "webpack-dev-server --open",
    "test": "echo \\"Error: no test specified\\" && exit 1"`;

const getDeps = deps =>
    Object.entries(deps)
        .map(dep => `${dep[0]}@${dep[1]}`)
        .toString()
        .replace(/,/g, ' ')
        .replace(/^/g, '')
        // exclude the plugin only used in this file, nor relevant to the boilerplate
        .replace(/fs-extra[^\s]+/g, '')
        .replace(/chalk[^\s]+/g, '')
        .replace(/ora[^\s]+/g, '');

async function mage() {
    const project_name = await askQuestion(`What would you like to name your application? \n`).catch(error=> {
        throw new Error(`${error}`)
    });
    console.log(`Initializing ${project_name} ...`);
    await createProjectDirectory(project_name).catch(error=> {
        throw new Error(`${error}`)
    });
    await copySourceDirectory(project_name).catch(error=> {
        throw new Error(`${error}`)
    });
    const files_to_copy = ['README.md', 'webpack.config.js', '.babelrc', '.gitignore'];
    await copyFiles(files_to_copy, project_name).catch(error=> {
        throw new Error(`${error}`)
    });

    const spinner = ora('Installing dependencies -- it might take a while..').start();


    await initializePackageJson(project_name).catch(error=> {
        spinner.stopAndPersist({
            text:'Something went wrong..',
            symbol:"✖"
        });
        throw new Error(`${error}`)
    });
    const npmStdout = await installingDependencies(project_name);
    spinner.stopAndPersist({
        text:'Dependencies installed successfully..',
        symbol:"✔"
    });
    console.log(chalk.cyan(npmStdout));

    console.log(chalk.green(`All done!\nYour app is now started into ${project_name} folder, refer to the README for the project structure.\nHappy Coding!`));

}



function askQuestion(question){
    return new Promise((resolve, reject)=>{
        readline.question(`${question}`, (answer) => {
            readline.close();
            if(!answer)
            {
                reject('Invalid Input');
                return;
            }
            resolve(answer);
        });

    })
}

function createProjectDirectory(project_name){
    return new Promise((resolve, reject)=>{
        if(!project_name)
        {
            reject('Invalid project name');
            return;
        }
        exec(`mkdir ${project_name} && cd ${project_name} && npm init -f`, (initErr)=>{
            if (initErr) {
                reject(`Error while creating new project directory: ${initErr}`);
                return;
            }
            resolve();
        })
    })
}
function copyFiles(filesToCopy=[], project_name){

    return new Promise((resolve, reject)=>{

        filesToCopy.forEach((file)=>{
            if(file !== '.gitignore')
                fs.createReadStream(path.join(__dirname, `../${file}`))
                    .pipe(fs.createWriteStream(`${project_name}/${file}`));
        });

        https.get(
            'https://raw.githubusercontent.com/RameezAijaz/simple-chrome-extension/master/.gitignore',
            (res) => {
                res.setEncoding('utf8');
                let body = '';
                res.on('data', (data) => {
                    body += data;
                });
                res.on('end', () => {
                    fs.writeFile(`${project_name}/.gitignore`, body, { encoding: 'utf-8' }, (err) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                });
            },
        );

    });


}
function initializePackageJson(project_name){
    return new Promise((resolve, reject)=>{
        if(!project_name)
        {
            reject('Invalid project name');
            return;
        }
        const new_package_json = `${project_name}/package.json`;
        // replace the default scripts, with the webpack scripts in package.json
        fs.readFile(new_package_json, (err, file) => {
            if (err) {
                reject(`Error while creating new project directory: ${err}`);
                return;
            }
            const data = file
                .toString()
                .replace('"test": "echo \\"Error: no test specified\\" && exit 1"', scripts);
            fs.writeFile(new_package_json, data,(err)=>{
                if(err)
                {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    })
}
function copySourceDirectory(project_name){
    return fs
        .copy(path.join(__dirname, '../src'), `${project_name}/src`);
}
function installingDependencies(project_name){

    return new Promise((resolve, reject)=>{

        // installing dependencies
        const devDeps = getDeps(existing_package_json.devDependencies);
        const deps = getDeps(existing_package_json.dependencies);
        exec(
            `cd ${project_name} && npm i -D ${devDeps} && npm i -S ${deps}`,
            (npmErr, npmStdout, npmStderr) => {
                if (npmErr) {
                    reject(`Error while installing dependencies: ${npmErr}`);
                    return;
                }
                resolve(npmStdout);
            },
        );

    })

}

mage();