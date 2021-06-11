#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const ignore = require("./config.json").ignore;

const listAll = (path) => {

	//Are we in the first folder?
	let first = true;

	//Variables to store ascii data
	const data = "--";
	let tabs = "|";

	//Variables to store recursion data
	const inputPath = path || ".";

	const readFolder = (path) => {

		//If folder is ignored or too large (and not the first) abrv it
		if(isIgnored(path.match(/\w+$/))){
			console.log(chalk.grey.bold(`${(tabs + data) + path.match(/\w+$/)}...`));
			return;
		} else if(fs.readdirSync(path).length > 20 && !first){
			console.log(chalk.red.bold(`${(tabs + data) + path.match(/\w+$/)}...`));
			return;
		} else if(!first){
			console.log(chalk.rgb(161, 239, 255).bold((tabs + data) + path.match(/\w+$/)));
			tabs += "  |";
		}

		fs.readdirSync(path).forEach(file => {

			first = false;
			//Check for directory
			if(fs.lstatSync(path + "/" + file).isDirectory()){
				//Recursivlely check through folders
				readFolder(path + "/" + file);
			} else {
				console.log(chalk.rgb(255, 231, 161)((tabs + data) + file));
			}
		});

		//remove tab (back down a folder)
		tabs = tabs.split("").slice(0, -3).join("");
	}

	//initial call
	readFolder(inputPath)
}

const isIgnored = (folder) => {
	if(!folder){
		return false;
	}
	for(let name of ignore) {
		if (folder[0] === name){
			return true;
		}
	}
	return false;
}

var args = process.argv.slice(2).join("");
listAll(args);

