import express from "express";
import { env } from "process";
import "dotenv/config";
import { ENV } from "./config/env.js";
import { error } from "console";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import { and, eq } from "drizzle-orm";
import job from "./config/cron.js";



const app = express(); 

app.use(express.json());
 if(ENV.NODE_ENV === "production") job.start();

const PORT = ENV.PORT || 3001;

app.get("/api/shoping",(req,res)=>{
    res.status(200).json({success:true});
})



app.post("/api/favorites", async(req,res)=>{
    try{
        let {userId, recipeId,title, image,shopTime,servings} = req.body;

        if (!userId || !recipeId || !title) {
      return res.status(400).json({ error: "Missing request fields" });

    
    }
    userId = Number(userId);
    recipeId = Number(recipeId);
    servings = servings !== undefined ? Number(servings) : null;


    // ✅ إدخال البيانات فالداتا بيز
    const newFavorite = await db
      .insert(favoritesTable)
      .values({
        userId,
        recipeId,
        title,
        image : null || "https://placehold.co/300x300",
        shopTime,
        servings,
      });
    res.status(201).json(newFavorite[0]);
    
    }catch(error){
        console.log("Error adding favorites ", error);

        res.status(500).json({error:"Someting went wrong"});
    }

});

app.get("/api/favorites/:userId", async(req,res)=>{

    console.log("soufiane",req.params)
    try{
        const {userId} = req.params;
        const userFavorites = await
        db.select().from(favoritesTable).where(eq(favoritesTable.userId,userId));

    }catch(error){
        console.log("walo matzade");
        res.status(500).json({error:"somteng went wrong"})
    }
})

app.delete("/api/favorites/:userId/:recipeId", async(req,res)=>{
    try{
        const {userId,recipeId} = req.params;
        await db.delete(favoritesTable).where(and
            (eq(favoritesTable.userId,userId),eq(favoritesTable.recipeId,parseInt(recipeId)))
    );

    }catch(error){
        console.log("error removing a favorite",error);
        res.status(500).json({error:"somting went wrong"});
    }
})



app.listen(PORT,()=>{
    console.log("server is runing in :localhost:",PORT);
})
