import { pgTable, serial, text,timestamp,integer } from "drizzle-orm/pg-core";
import { title } from "process";
 

export const favoritesTable = pgTable("favorites",{
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    recipeId: integer("recipe_id").notNull(),
    title: text("title").notNull(),
    Image: text("image"),
    shopTime: text("shop_time"),
    servings: text("servings"),
    createdAt: timestamp("created_at").defaultNow(),

})

