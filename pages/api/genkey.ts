// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from "ethers";
const { MongoClient } = require('mongodb');


type Data = {
    name: string
}

async function getWallet(key: any, start: any) {
    const uri = "mongodb+srv://walletgen:wallets2463fh@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db("walletgen");
    const collection = db.collection("wallets");

    let wallet;
    while(true) {
        wallet = ethers.Wallet.createRandom();

        if(wallet.address.startsWith(start)) {
            break;
        }
    }

    const data = {
        key: key,
        address: wallet.address,
        privateKey: wallet.privateKey,
        publicKey: wallet.publicKey
    };

    await collection.insertOne(data);
}

async function checkKey(key: any, start: any) {
    const uri = "mongodb+srv://walletgen:wallets2463fh@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db("walletgen");
    const approvedKeys = db.collection("approvedKeys");

    if(!start.startsWith("0x") || start.length > 7) {
        return 'invalid format'
    };
    
    // Find if key is in approved list
    const approvedKey = await approvedKeys.findOne({ key: key });
    if (!approvedKey) {
        return {
            status: "invalid key",
        }
    }

    // Delete key
    await approvedKeys.deleteOne({ key: key });
    await client.close();

    getWallet(key, start);

    return {
        status: 'generating'
    };
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
    const wallet = await checkKey(req.query.key, req.query.wallet);
    res.status(200).json({ wallet });
}
