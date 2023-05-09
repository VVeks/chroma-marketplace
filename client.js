
const { randomInt } = require("crypto");
const pcl = require("postchain-client")


async function simpleClient() {
  //Key pair
  const adminPubkey = Buffer.from(
    "031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078f",
    "hex"
  );
  const adminPrivkey = Buffer.from(
    "0101010101010101010101010101010101010101010101010101010101010101",
    "hex"
  );

  const aliceKeypair = {
    priv: Buffer.from("a3a0b4cd66de47ad5fce84300cc31b0b6ae9713ab9cec6f2de56f6b77817948f", "hex"),
    pub: Buffer.from("02ae9f061829533b2e15ee723e39fc3084d1ff31e8779a68c25444006a06c1832c", "hex")
  }


  //Connection setup
  const nodeApiUrl = "http://localhost:7740/"; //Using default postchain node REST API port
  const blockchainRID =
    "38A8E8C12ADEB27DA3807192C599324EF81262148728B64E3F8D7B55287B8074"; //Dapp Blockchain RID
  const rest = pcl.restClient.createRestClient([nodeApiUrl], blockchainRID); //REST Client connection
  const gtx = pcl.gtxClient.createClient(rest, blockchainRID, ["set_name"]); //gtx Client connection

  // const request = gtx.newTransaction([adminPubkey]); //Create transaction

  try {

    await register(aliceKeypair.priv, aliceKeypair.pub, gtx, "alice")
    const initBalance = await gtx.query("get_balance", { pubkey: aliceKeypair.pub });
    console.log(initBalance);  
    await mintNftOperation(aliceKeypair.priv, gtx, aliceKeypair.pub, 2)  
    await mintNftOperation(aliceKeypair.priv, gtx, aliceKeypair.pub, 3)  
    const first_nft = await getNft(gtx, 2)
    const nfts = await getNfts(gtx, aliceKeypair.pub)  
    console.log(first_nft)
    console.log("nfts: ")
    console.log(nfts)
    
  } catch (error) {
    console.log(error)
    
  }



}

async function register(privkey, pubkey, gtx, username) {
  const request = gtx.newTransaction([pubkey]); //Create transaction
  // request.register(pubkey, "smetlar"); //Call operation
  request.addOperation("register", pubkey, username); //Call operation
  request.addOperation("nop", randomInt(12345678)); //A random int to make the hash of the transaction unique

  request.sign(privkey, pubkey); //Sign transaction
  await request.postAndWaitConfirmation(); //Post to blockchain node
}

async function mintNftOperation(privkey, gtx, pubkey, tokenId) {
  const request = gtx.newTransaction([pubkey]); //Create transaction
  request.addOperation("mint_nft", pubkey, tokenId)
  request.sign(privkey, pubkey); //Sign transaction
  await request.postAndWaitConfirmation(); //Post to blockchain node
}

async function  getNft(gtxClient,	tokenId) {
	return await gtxClient.query("get_nft", {token_id: tokenId})
}

async function  getNfts(gtxClient,	pubkey) {
	return await gtxClient.query("get_nfts", {pubkey: pubkey})
}



simpleClient();
