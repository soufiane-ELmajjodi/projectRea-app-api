import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { ENV } from "./env.js";
import * as shema from "../db/schema.js"

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql,{shema}); 