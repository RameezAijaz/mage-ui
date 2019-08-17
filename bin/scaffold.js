#!/usr/bin/env node

const code_index = require('./code_index'),
    chalk = require('chalk'),
    ora = require('ora'),
    fs = require('fs-extra'),
    path = require('path'),
    https = require('https'),
    { exec } = require('child_process'),
    readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    Transform = require('stream').Transform;

const includesElementOf = (arr, str)=>{
    for(let i=0; i< arr.length; i++){
        if(str.toLowerCase().includes(arr[i].toLowerCase()))
        {
            return true;
        }
    }
    return false;
};
const existing_package_json = require('../package.json');

const scripts = `"build": "webpack --mode production",
    "watch": "webpack --watch",
    "start": "webpack-dev-server --open",
    "test": "echo \\"Error: no test specified\\" && exit 1"`,
    redux_imports = [
        `import rootReducer from './reducers';`,
        `import logger from 'redux-logger'`,
        `import { Provider } from 'react-redux'`,
        `import { applyMiddleware, createStore } from 'redux';`,
        `import ShoppingCart from '../../pages/ShoppingCart/ShoppingCart';`,
    ],
    redux_code = [
        'const store = createStore(rootReducer, applyMiddleware(logger));',
        '<Provider store={store}>',
        '</Provider>',
        `<NavLink className="nav-link" to="/shoppingCart" exact={true}>Redux Shopping Cart Example</NavLink>`,
        ',\n' +
        '    {\n' +
        '        path:"/shoppingCart/",\n' +
        '        component:ShoppingCart\n' +
        '    }\n'
    ];


const getDeps = (deps, config) => {
    let packages = Object.entries(deps).map(dep => `${dep[0]}@${dep[1]}`).toString().replace(/,/g, ' ').replace(/^/g, '');

    code_index.packages.mageui.forEach((p)=>{
        packages = packages.replace(new RegExp(`${p}[^\\s]+`, 'g'), '')
    });
    if(config.include_redux === 'n'){
        code_index.packages.redux.forEach((p)=>{
            packages = packages.replace(new RegExp(`${p}[^\\s]+`, 'g'), '')
        });
    }
    return packages;
};


async function mage() {
    const project_name = await askQuestion(`What would you like to name your application? \n`).catch(error=> {
        throw new Error(`${error}`)
    });


    console.log(`Initializing ${project_name} ...`);
    let include_redux_response = await askQuestion(`Do you need redux in ${project_name}? (Y/N or y/n)\n`).catch(error=> {
        throw new Error(`${error}`)
    });
    readline.close();

    include_redux_response = include_redux_response.toLowerCase();
    const possible_responses = ['y', 'n', 'yes', 'no'];
    if(!possible_responses.includes(include_redux_response)) {
        include_redux_response = 'y';
    }
    include_redux_response = include_redux_response === 'yes' ? 'y' : include_redux_response;
    include_redux_response = include_redux_response === 'no' ? 'n' : include_redux_response;



    const config = {
        include_redux: include_redux_response
    };
    console.log(`Creating ${project_name} directory`);
    await createProjectDirectory(project_name).catch(error=> {
        throw new Error(`${error}`)
    });
    await copySourceDirectory(project_name, config).catch(error=> {
        throw new Error(`${error}`)
    });
    modifyFiles(code_index.files_to_change, project_name, config);


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
    const npmStdout = await installingDependencies(project_name, config);
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

function modifyFiles(filesToModify=[], project_name, config){

    filesToModify.forEach((file)=>{
        /// Create the transform stream:
        let filterCode = new Transform({
                decodeStrings: false

            });
        filterCode._transform = function(chunk, encoding, done) {
            let code = chunk.toString();
            if(config.include_redux === 'n'){


                code = code.replace('{/* REDUX_SPECIFIC_CODE_START */}','REDUX_SPECIFIC_CODE_START' )
                    .replace('{/* REDUX_SPECIFIC_CODE_END */}','REDUX_SPECIFIC_CODE_END' )
                    .replace(/^\* REDUX_SPECIFIC_CODE_START \*$/,'REDUX_SPECIFIC_CODE_START' )
                    .replace(/^\* REDUX_SPECIFIC_CODE_END \*$/,'REDUX_SPECIFIC_CODE_END' );

                const regex = new RegExp(`(REDUX_SPECIFIC_CODE_START)([\\S\\s]*)(REDUX_SPECIFIC_CODE_END)`);
                console.log("REGEX+++++++++++++");
                console.log(regex);
                // code = code.replace(regex, '');

                console.log("encoding");
                console.log(encoding);
                console.log(code);
            }else{
                code = code.replace('{/* REDUX_SPECIFIC_CODE_START */}','' );
                code = code.replace('{/* REDUX_SPECIFIC_CODE_END */}','' );
                code = code.replace('\/\* REDUX_SPECIFIC_CODE_START \*\/','' );
                code = code.replace('\/\* REDUX_SPECIFIC_CODE_END \*\/','' );
            }
            done(null, code);
        };
        fs.createReadStream(path.join(__dirname, `../${file}`), {encoding:'ascii'})
            .pipe(filterCode)
            .pipe(fs.createWriteStream(`${project_name}/${file}`, {encoding:'ascii'}));


    });
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

function copySourceDirectory(project_name, config){
    return fs
        .copy(path.join(__dirname, '../src'),
            `${project_name}/src`
            ,{
                filter: async function (path) {
                    if(config.include_redux === 'n'){

                        let filter = true,
                            files_to_avoid = [...code_index.directories.redux, ...code_index.files_to_change];
                        for(let i=0; i< files_to_avoid.length; i++){
                            if(path.includes(files_to_avoid[i]))
                            {
                                filter = false;
                                break;
                            }
                        }
                        return filter;
                    }
                    return true;
                }
            }

        );
}
function installingDependencies(project_name, config){

    return new Promise((resolve, reject)=>{

        // installing dependencies
        let devDeps = getDeps(existing_package_json.devDependencies, config),
            deps = getDeps(existing_package_json.dependencies, config);

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
