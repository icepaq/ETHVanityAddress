import type { NextApiRequest, NextApiResponse } from 'next'
const { MongoClient } = require('mongodb');

async function getWallet(key: any) {
    const uri = "mongodb+srv://walletgen:wallets2463fh@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db("walletgen");
    const collection = db.collection("wallets");

    const wallet = await collection.findOne({ key: key });

    return wallet;
}
export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
    const wallet = await getWallet(req.query.key);
    res.status(200).json({ wallet });
}
