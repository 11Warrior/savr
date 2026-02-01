import 'dotenv/config';
import { Command } from 'commander'
import { backup } from './backup'
import { restore } from './restore';

const program = new Command();

program
    .command('backup')
    .description('Backups your database.')
    .action(backup);


program
    .command('restore <filename>')
    .description('Restoring from existing db file')
    .action((filename) => restore(filename))

program.parse(process.argv);
