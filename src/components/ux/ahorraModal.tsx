import React, { useState, useEffect } from 'react'
// import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { ERC20ABI } from '@/components/onchain/abis/erc20'
import { useBalanceOf } from '@/hooks/useBalanceOf'
// import useSupply from '@/hooks/useSupply'
import { Abi, Address } from 'viem'
import Pool from '../onchain/abis/Pool'

const AhorraModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const { address } = useAccount()
  const [amount, setAmount] = useState('')
  const [requiresApproval, setRequiresApproval] = useState(false)
  const [assetAllowanceState, setAssetAllowanceState] = useState('0')
  const [balanceError, setBalanceError] = useState<string | null>(null)

  // Use the existing hooks for balance and allowance
  const assetContract = '0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf'
  const assetBalance = useBalanceOf({
    tokenAddress: assetContract,
    walletAddress: address as Address,
  })

  const poolContract = '0x7a8AE9bB9080670e2BAFb6Df3EA62968F4Ad8a88'
  const {
    data: assetAllowance,
    isError: isAssetAllowanceError,
    isLoading: isAssetAllowanceLoading,
  } = useReadContract({
    address: assetContract,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: [address as Address, poolContract],
  })

  useEffect(() => {
    if (isAssetAllowanceError) {
      console.error('Error fetching allowance')
      setAssetAllowanceState('0')
    } else if (!isAssetAllowanceLoading && assetAllowance) {
      const allowanceInEther = (Number(assetAllowance) / 1e18).toFixed(7)
      setAssetAllowanceState(allowanceInEther)
    }
  }, [assetAllowance, isAssetAllowanceError, isAssetAllowanceLoading])

  const {
    writeContract: approveERC20,
    isError: isApprovalError,
    isPending: isApprovalPending,
    isSuccess: isApprovalSuccess,
    data: hash,
  } = useWriteContract()

  useEffect(() => {
    if (isApprovalError) {
      console.error('Error during approval')
      setRequiresApproval(false)
    } else if (isApprovalSuccess) {
      console.log('Approval successful')
      setRequiresApproval(false)
    } else if (isApprovalPending) {
      setRequiresApproval(true)
    }
  }, [isApprovalError, isApprovalSuccess, isApprovalPending])

  const { isLoading: isApprovalLoading, isSuccess: isApprovalTxSuccess } =
    useWaitForTransactionReceipt({ hash })

  /*   const {
    handleSupply: handleDeposit,
    isPending: isDepositPending,
    isError: isDepositError,
    status: depositStatus,
    error,
    data: depositHash,
  } = useSupply()
 */

  const {
    writeContract: handleDeposit,
    isPending: isDepositPending,
    isError: isDepositError,
    status: depositStatus,
    error,
    data: depositHash,
  } = useWriteContract()

  const handleSupply = async () => {
    const assetAmount = parseFloat(amount) || 0
    const amountInWei = BigInt(assetAmount * 1e18)

    try {
      await handleDeposit({
        abi: Pool as Abi,
        address: poolContract as Address,
        functionName: 'supply',
        args: [assetContract as Address, amountInWei, address as Address, 0],
      })
    } catch (err) {
      console.error('Error executing contract function:', err)
    }
  }
  useEffect(() => {
    const assetAmount = parseFloat(amount) || 0
    if (assetBalance && assetAmount > parseFloat(assetBalance)) {
      setBalanceError("You don't have enough tokens in your wallet")
    } else {
      setBalanceError(null) // Clear error if valid
    }
  }, [amount, assetBalance])

  useEffect(() => {
    // Function to check if approval is required
    const checkIfApprovalNeeded = () => {
      const assetAmount = parseFloat(amount) || 0

      // Compare the input value against the allowance state
      const needsApproval = assetAmount > parseFloat(assetAllowanceState)
      setRequiresApproval(needsApproval)
    }

    checkIfApprovalNeeded()
  }, [amount, assetAllowanceState])

  useEffect(() => {
    if (isDepositError) {
      console.error(
        'Deposit error:',
        error?.message || 'An unknown error occurred.',
      )
    }
    if (depositHash) {
      console.log('Deposit successful, transaction hash:', depositHash)
      onClose() // Close the modal after a successful deposit
    }
  }, [isDepositError, depositHash, error])

  useEffect(() => {
    const assetAmount = parseFloat(amount) || 0

    if (assetAmount <= 0 || isNaN(assetAmount)) {
      setBalanceError(null) // Clear balance-related errors if amount is invalid
      console.error('Amount must be a positive number.')
    } else if (assetBalance && assetAmount > parseFloat(assetBalance)) {
      setBalanceError("You don't have enough tokens in your wallet")
    } else {
      setBalanceError(null) // Clear any balance-related errors
    }
  }, [amount, assetBalance])

  const handleApproval = async () => {
    const assetAmount = parseFloat(amount) || 0

    try {
      if (assetAmount > parseFloat(assetAllowanceState)) {
        await approveERC20({
          abi: ERC20ABI,
          address: assetContract as Address,
          functionName: 'approve',
          args: [poolContract, assetAmount * 1e18],
        })
      }
    } catch (error) {
      console.error('Error approving', error)
    }
  }
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:text-primary sm:max-w-lg md:max-w-2xl">
        <h2 className="mb-4 ml-1 text-lg font-bold sm:text-xl">
          Ahorra en Cuenta Sustantiva
        </h2>
        <p className="mb-4 ml-1 text-sm sm:text-base">
          Deposita tus fondos en el contrato de Alux, donde recibirás un
          rendimiento preferencial.
        </p>

        <div role="alert" className="alert mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-5 w-5 shrink-0 sm:h-6 sm:w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <div className="container-gray-borders flex flex-col gap-2">
            <label className="text-sm font-bold sm:text-base">
              Cantidad a depositar (XOC)
            </label>
            <div className="flex items-center">
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
                className="without-borders w-full text-sm sm:text-base"
              />
              <span className="ml-2 font-bold">XOC</span>
            </div>
            <span
              className="mt-2 cursor-pointer text-sm font-bold hover:underline sm:text-base"
              onClick={() => setAmount(assetBalance || '')}
            >
              MAX
            </span>
            {balanceError && (
              <p className="ml-2 text-xs text-red-600">{balanceError}</p>
            )}
          </div>

          <div className="container-gray-borders flex flex-col gap-2">
            <label className="text-sm font-bold sm:text-base">
              Transaction Overview
            </label>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span>You will deposit:</span>
              <div className="flex items-center gap-1">
                <span>{amount ? amount : 0}</span>
                <span className="font-bold">XOC</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <p className="text-xs text-gray-500">Wallet Balance:</p>
              <div className="flex items-center gap-1">
                <span>{assetBalance}</span>
                <span className="font-bold">XOC</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <p className="text-xs text-gray-500">Allowance:</p>
              <div className="flex items-center gap-1">
                <span>{assetAllowanceState}</span>
                <span className="font-bold">XOC</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            {requiresApproval ? (
              isApprovalLoading ? (
                <div className="bg-warning text-base-100 flex-grow cursor-not-allowed rounded-lg py-2 text-center sm:basis-2/3">
                  Waiting for approval...
                </div>
              ) : isApprovalTxSuccess ? (
                <button
                  className={`flex-grow bg-primary sm:basis-2/3 ${!balanceError ? 'primary-btn' : 'disabled-btn'}`}
                  onClick={handleSupply}
                  disabled={isDepositPending || balanceError !== null}
                >
                  {isDepositPending ? 'Processing...' : 'Deposit'}
                </button>
              ) : (
                <button
                  className={`flex-grow bg-secondary text-white sm:basis-2/3 ${!isApprovalPending ? 'primary-btn' : 'disabled-btn'}`}
                  onClick={handleApproval}
                  disabled={isApprovalPending || !requiresApproval}
                >
                  {isApprovalPending ? 'Processing...' : 'Approve'}
                </button>
              )
            ) : (
              <button
                className={`flex-grow bg-primary text-white sm:basis-2/3 ${!balanceError ? 'primary-btn' : 'disabled-btn'}`}
                onClick={handleSupply}
                disabled={isDepositPending || balanceError !== null}
              >
                {isDepositPending ? 'Processing...' : 'Deposit'}
              </button>
            )}
            <button
              onClick={onClose}
              className="secondary-btn border-4 flex-grow sm:basis-1/3"
            >
              Close
            </button>
          </div>
        </div>

        {isDepositError && (
          <div className="mt-6 flex flex-col gap-6">
            <div className="error-container text-center">
              <p className="text-xs sm:text-sm">
                Something went wrong.{' '}
                <span
                  onClick={() =>
                    navigator.clipboard
                      .writeText(error?.message || '')
                      .then(() => console.log('Error copied to clipboard'))
                      .catch((err) =>
                        console.error('Failed to copy error to clipboard', err),
                      )
                  }
                  className="cursor-pointer underline"
                >
                  Copy the error.
                </span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="primary-btn text-xs sm:text-sm"
            >
              Close
            </button>
          </div>
        )}

        {depositHash && (
          <div className="mt-6 flex flex-col gap-6">
            <div className="success-container text-center">
              <h2 className="text-base sm:text-lg">All done!</h2>
              <p className="text-xs sm:text-sm">
                Deposit transaction successful
              </p>
              <div className="text-xs sm:text-sm">
                Transaction depositHash: {depositHash}
              </div>
              <div className="text-xs sm:text-sm">
                Deposit Status: {depositStatus}
              </div>
            </div>
            <button
              onClick={onClose}
              className="primary-btn text-xs sm:text-sm"
            >
              Ok, close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AhorraModal
