import 'dotenv/config';
import os from 'os';
import { BackupManager } from "../core/BackupManager";
import { LocalStorage } from "../storage/LocalStorage";
import { AdapterFactory } from '../factory/AdapterFactory';
import { getScheduler } from '../factory/SchedulerFactory';
import { ValidInterval } from '../utils/utils';

const platform = os.platform();

export const backup = async (dbtype: string, interval: string = " ") => {

    const storage = new LocalStorage(dbtype);
    const adapter = AdapterFactory.getAdapter(dbtype);
    const backupManager = new BackupManager(adapter, storage);
    const scheduler = getScheduler(platform, dbtype);

    if (!scheduler) return;

    if (interval === "0") {
        await scheduler.stop();
        process.exit(0)
    }
    
    if (interval && interval.trim().length > 0) {
        const validInterval = ValidInterval(interval);

        if (validInterval) {
            //auto backup flow goes here
            await scheduler.start(validInterval);
        }
        process.exit(0);

    }
    const fileName = `backup-${Date.now()}.${dbtype === 'postgres' ? 'sql' : dbtype === 'mongodb' ? 'mongodb' : ' '}`;

    console.log('Preparing backup...');
    // console.log(interval);

    // console.log(validInterval);

    await backupManager.run(fileName);

    process.exit(0);
}