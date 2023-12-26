import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';

(async () => {
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';

(async () => {
 =
    
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
=
    var fromWallet = Keypair.generate();

   =
    const toWallet = Keypair.generate();

 =
    console.log("Airdopping SOL to Sender wallet!");
    
    const fromAirDropSignature = await connection.requestAirdrop(fromWallet.publicKey, 2 * LAMPORTS_PER_SOL);
 height (refers to its time)
  
    await connection.confirmTransaction(fromAirDropSignature, { commitment: "confirmed"});

    console.log("Airdrop completed ");
    

    const mint = await createMint(connection,fromWallet,fromWallet.publicKey,null,9);
    
    const fromTokenAcct = getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey
    );
    
   
    let signature = mintTo(
        connection,
        fromWallet,
        mint,
        (await fromTokenAcct).address,
        fromWallet.publicKey,
        1000000000,
        []
    );
    console.log("Mint tx", signature);

    const toTokenAcct = getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        toWallet.publicKey
    );

    signature = await transfer(
        connection,
        fromWallet,
        (await fromTokenAcct).address,
        (await toTokenAcct).address,
        fromWallet.publicKey,
        1000000000,
        []
    );
    console.log("Transfer tx", signature);
 
})();
