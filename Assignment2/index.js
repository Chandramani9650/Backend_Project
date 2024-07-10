const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
const command = args[0];
const target = args[1];
const content = args[2];



// Check if arguments are provided
if (args.length < 2 && command !== 'list') {
    console.log('Invalid number of arguments.');
    
    process.exit(1);
}

switch (command) {
    case 'read':
        fs.readFile(target, 'utf-8', (err, data) => {
            if (err) {
                console.error(`Error reading file: ${err.message}`);
                return;
            }
            console.log(data);
        });
        break;

    case 'delete':
        fs.unlink(target, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err.message}`);
                return;
            }
            console.log(`File '${target}' deleted`);
        });
        break;

    case 'create':
        fs.writeFile(target, '', (err) => {
            if (err) {
                console.error(`Error creating file: ${err.message}`);
                return;
            }
            console.log(`File '${target}' created`);
        });
        break;

    case 'append':
        if (args.length < 3) {
            console.log('Invalid number of arguments for append.');
            printUsage();
            process.exit(1);
        }
        fs.appendFile(target, `\n${content}`, (err) => {
            if (err) {
                console.error(`Error appending to file: ${err.message}`);
                return;
            }
            console.log(`Content appended to the file '${target}'`);
        });
        break;

    case 'rename':
        if (args.length < 3) {
            console.log('Invalid number of arguments for rename.');
            printUsage();
            process.exit(1);
        }
        const newFilename = content;
        fs.rename(target, newFilename, (err) => {
            if (err) {
                console.error(`Error renaming file: ${err.message}`);
                return;
            }
            console.log(`File '${target}' renamed to '${newFilename}'`);
        });
        break;

    case 'list':
        const directory = target || '.';
        fs.readdir(directory, (err, files) => {
            if (err) {
                console.error(`Error listing directory: ${err.message}`);
                return;
            }
            files.forEach(file => {
                console.log(file);
            });
        });
        break;

    default:
        console.log('Invalid command.');
        printUsage();
        process.exit(1);
}
