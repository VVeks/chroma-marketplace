# chroma-marketplace

Task: 
- Create a marketplace with the following functionality. A user should be able to:
- register account
- create a collection
- mint an NFT (an NFT doesn’t have to belong to any collection)
- list an NFT
- buy an NFT
- add/remove collection to/from favorites
- add/remove NFT to/from favorites
- use queries for read info from blockchain and operation to write something

---

1.) install prereqs by following: https://rell.chromia.com/en/master/index.html

2.) setup database:
```bash 
sudo -u postgres psql -c "CREATE DATABASE postchain WITH TEMPLATE = template0 LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8' ENCODING 'UTF-8';" -c "CREATE ROLE postchain LOGIN ENCRYPTED PASSWORD 'postchain'; GRANT ALL ON DATABASE postchain TO postchain;"
```
2a.) if specific port or host, add to database.local.yml - or delete the include in config.yml

3.) 
```bash 
npm install
```
3.) 
```bash 
chr node start
```
4.) Copy RID

5.) paste to client.js 
```js
const blockchainRID =
    "38A8E8C12ADEB27DA3807192C599324EF81262148728B64E3F8D7B55287B8074"; //Dapp Blockchain RID
```

6.) 
```bash 
node client.js
```
runs the nodejs client

7.) 
```bash
chr test --use-db
```
runs the tests in rell