import path from 'path';
import fs, { createReadStream, createWriteStream } from 'fs'
import { Readable } from 'stream';

export class LocalStorage {
    save(dataStream: Readable, filename: string) {
        return new Promise((resolve, reject) => {
            const filePath = path.join('backup', 'postgress', filename)
            dataStream.pipe(createWriteStream(filePath)).on('finish', resolve);
        })
    }

    load(filename: string) {
        return fs.createReadStream(path.join('backup', 'postgress', filename));
    }
}