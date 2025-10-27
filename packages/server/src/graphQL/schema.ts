import { readFileSync } from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql')).toString('utf-8');

export default typeDefs;
