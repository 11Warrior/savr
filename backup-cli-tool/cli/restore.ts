import { PostgresAdapter } from "../adapters/PostgresAdapter/PostgresAdapter";
import { RestoreManager } from "../core/RestoreManager";
import { LocalStorage } from "../storage/LocalStorage";

export const restore = async (filename: string) => {

    const adapter = new PostgresAdapter(process.env);
    const storage = new LocalStorage();

    const restoreManager = new RestoreManager(adapter, storage);

    console.log('Restoring database... ', filename);
    await restoreManager.run(filename);
}