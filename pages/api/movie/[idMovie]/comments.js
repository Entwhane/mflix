// pages/api/movies.js
import clientPromise from "../../../../lib/mongodb"; 
import { ObjectId } from 'mongodb';
import { MongoConfig } from "../../../config/mongoconfig";



/**
 * @swagger
 * tags:
 *   name: Commentaires
 *   description: Operations liées aux commentaires des films
 * /api/movie/{idMovie}/comments:
 *   get:
 *     description: Retourne tous les commentaires
 *     tags: [Commentaires]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commentaires retournés
 */
export default async function handler(req, res) {
    const { idMovie } = req.query
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const comments = await db.collection(MongoConfig.collections.comments).find({ movie_id: ObjectId(idMovie) }).toArray();
    res.json({ status: 200, data: comments });
}