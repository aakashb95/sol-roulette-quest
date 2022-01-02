const web3 = require('@solana/web3.js')

const connection = new web3.Connection(
  web3.clusterApiUrl('devnet'),
  'confirmed',
)
// console.log(connection)

const newPair = new web3.Keypair()
const publicKey = new web3.PublicKey(newPair._keypair.publicKey).toString()
const secretKey = newPair._keypair.secretKey

const getWalletBalance = async () => {
  try {
    const connection = new web3.Connection(
      web3.clusterApiUrl('devnet'),
      'confirmed',
    )
    const walletKeyPair = await web3.Keypair.fromSecretKey(secretKey)
    const balance = await connection.getBalance(
      new web3.PublicKey(walletKeyPair.publicKey),
    )
    console.log(
      `Balance for ${publicKey} is ${balance / web3.LAMPORTS_PER_SOL}`,
    )
  } catch (err) {
    console.log(err)
  }
}

const airDropSol = async () => {
  try {
    const connection = new web3.Connection(
      web3.clusterApiUrl('devnet'),
      'confirmed',
    )
    const walletKeyPair = await web3.Keypair.fromSecretKey(secretKey)
    const fromAirDropSignature = await connection.requestAirdrop(
      new web3.PublicKey(walletKeyPair.publicKey),
      2 * web3.LAMPORTS_PER_SOL,
    )
    await connection.confirmTransaction(fromAirDropSignature)
  } catch (err) {
    console.log(err)
  }
}

const driverFunction = async () => {
  await getWalletBalance()
  await airDropSol()
  await getWalletBalance()
}

driverFunction()

const transaction = new web3.Transaction().add(
  web3.SystemProgram.transfer({
    fromPubkey: new web3.PublicKey(from.publicKey.toString()),
    toPubkey: new web3.PublicKey(to.publicKey.toString()),
    lamports: web3.LAMPORTS_PER_SOL,
  }),
)
