#! /usr/bin/env node
'use strict'
process.title = 'vnjson-cli';

const main = require('./main.js');
const dirTree = require('walk-dir-tree');
const co = require('co');
const log = require('my-log');
const msg = require('./messages');

const program = require('commander');
program
  .command('*')
  .action(function(env){
    log.warn(msg['cmdNotFound'], env);
  });

program
	.command('init')
	.description('initialize project')
	.action(()=>{
		main['init']();
	});
program
	.command('tree')
	.description('file structure project')
	.action(()=>{
		co(dirTree(process.cwd()))
			.then(function(str) {
  				console.log(str.join('\n'))
			})
			.catch(function(err) {
  				console.error(err.stack)
			});
	})
program
	.command('help')
	.description('list commands')
	.action(()=>{
		program.outputHelp();
	});
program
	.command('rm [path]')
	.description('remove projects')
	.action(function(path){
		main['rm'](path);
	})
 
program
	.command('run [platform]')
	.description('run project')
	.action(function(platform){
			main['run'](platform);
	})
program
	.command('build [platforms...]')
	.description('build project')
	.action(function(platforms){
		main['build'](platforms);
	});

program
	.command('test')
	.action(function(){
		main['test']();
	});	
program.parse(process.argv);
