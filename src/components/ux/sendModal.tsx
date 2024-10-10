import { useState } from 'react'
import { useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const SendModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const [amount, setAmount] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')

  const { writeContract: transferXOC, isError: errorTransfering, isSuccess: succesfulTransfer} = useWriteContract();

  const handleTransfer = async () => {
    // Ensure amount is valid
    if (!recipientAddress || (amount && !isNaN(Number(amount)))) {
      try {
        // Start the transaction
        const tx = await transferXOC({
          address: '0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf',
          abi: [
            // ERC20 ABI
            {
              "constant": false,
              "inputs": [
                {
                  "name": "_to",
                  "type": "address"
                },
                {
                  "name": "_value",
                  "type": "uint256"
                }
              ],
              "name": "transfer",
              "outputs": [
                {
                  "name": "",
                  "type": "bool"
                }
              ],
              "type": "function"
            }
          ],
          functionName: 'transfer',
          args: [recipientAddress, parseEther(amount)],
        })

        console.log('Transfer sent:', tx)
      } catch (error) {
        console.error('Transfer failed:', error)
        alert('Transfer failed. Please try again.')
      }
    } else {
      alert('Please enter a valid amount and recipient address.')
    }
  }

 /*  const { sendTransaction } = useSendTransaction()

  const handleSend = async () => {
    // Ensure amount is valid
    if (!recipientAddress || (amount && !isNaN(Number(amount)))) {
      try {
        // Start the transaction
        const tx = await sendTransaction({
          to: recipientAddress as Address,
          value: parseEther(amount), // Convert the amount to ETH (wei)
        })

        // Optional: Wait for the transaction to be mined
        // await tx.wait()

        console.log('Transaction sent:', tx)
        // Only close the modal if the transaction succeeds
        // onClose() // Uncomment this if you want to close the modal after the transaction is successful
      } catch (error) {
        console.error('Transaction failed:', error)
        alert('Transaction failed. Please try again.')
      }
    } else {
      alert('Please enter a valid amount and recipient address.')
    }
  }
  console.log('amount', amount)
 */
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8">
        <h2 className="mb-6 text-2xl font-bold">Manda $XOC A Cualquiera</h2>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">
            Dirección del destinatario
          </label>
          <Input
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="0xDireccionDelWallet..."
            className="mb-4 block w-full"
          />
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Cantidad a mandar (XOC)
          </label>
          <Input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => {
              const value = e.target.value
              if (/^\d*\.?\d*$/.test(value)) {
                setAmount(value)
              }
            }}
            placeholder="Introduzca la cantidad (XOC)"
            className="mb-4 block w-full"
          />
        </div>
        <div className="flex justify-center space-x-4">
          <Button onClick={onClose} className="bg-gray-300 text-gray-700 hover:text-white">
            Cancel
          </Button>
          <Button onClick={handleTransfer} className="bg-gray-300 text-gray-700 hover:text-white">
            Send
          </Button>
        </div>
        {errorTransfering && (
          <div className="mt-4 text-center text-red-500">
            Transfer failed. Please try again.
          </div>
        )}
        {succesfulTransfer && (
          <div className="mt-4 text-center text-green-500">
            Transfer successful!
          </div>
        )}
      </div>
    </div>
  )
}

export default SendModal
