import { useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Toast } from '@/components/ui/toast'
import { Slider } from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Wallet } from 'lucide-react'

export default function Prestamo() {
  const searchParams = useSearchParams()
  const creditAllowed = searchParams.get('creditAllowed')
  const [loanAmount, setLoanAmount] = useState(parseInt(creditAllowed ?? '0'))
  const [toggleValue, setToggleValue] = useState('prestamo')
  const maxLoan = parseInt(creditAllowed ?? '0') // 95% of 2450 / 0.95
  const [isLoading, setIsLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVariant, setToastVariant] = useState<'default' | 'success' | 'destructive'>('default')
  const toastRef = useRef<HTMLDivElement>(null)

  const handleSliderChange = (value: number[]) => {
    setLoanAmount(Math.round(value[0]))
  }

  const showToast = (message: string, variant: 'default' | 'success' | 'destructive') => {
    setToastMessage(message)
    setToastVariant(variant)
    if (toastRef.current) {
      toastRef.current.classList.remove('hidden')
      setTimeout(() => {
        if (toastRef.current) {
          toastRef.current.classList.add('hidden')
        }
      }, 3000) // Hide after 3 seconds
    }
  }

  const handleClick = async () => {
    setIsLoading(true)
    try {
      // Assume we have a function to get the connected wallet address
      const walletAddress = "0xc2564e41B7F5Cb66d2d99466450CfebcE9e8228f"; //await getConnectedWalletAddress()
      const response = await fetch('/api/loan-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          walletId: walletAddress,
          amount: loanAmount
        }),
      });

      console.log(response);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process loan application');
      }

      // Show success message
      showToast(data.message, 'success')
    } catch (err) {
      console.log(err);
      showToast(err.message, 'destructive')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card className="mx-auto w-full">
        <CardHeader className="pb-2 text-left">
          <CardTitle className="text-xl">Tu Crédito</CardTitle>
          <CardDescription className="text-base"></CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mx-auto max-w-lg">
            <div className="mb-6 rounded-lg bg-white p-3">
              <p className="text-2xl font-bold">
                $1,500 <span className="text-sm font-normal">MXN</span>
              </p>
            </div>
            <ToggleGroup
              type="single"
              value={toggleValue}
              onValueChange={setToggleValue}
              className="mb-6 justify-stretch"
            >
              <ToggleGroupItem value="prestamo" className="w-1/2">
                Prestamo
              </ToggleGroupItem>
              <ToggleGroupItem value="repagar" className="w-1/2">
                Repagar
              </ToggleGroupItem>
            </ToggleGroup>
            <p className="mb-2 text-sm text-muted-foreground">
              Especifique la cantidad a pedir prestado
            </p>
            <div className="mb-4 rounded-lg bg-white p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    ${loanAmount} <span className="text-sm font-normal">MXN</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${(loanAmount * 0.0518).toFixed(2)} USD
                  </p>
                </div>
                <div className="flex items-center">
                  <Wallet className="mr-1 h-4 w-4" />
                  <span className="text-sm">0.34</span>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <Slider
                max={maxLoan}
                step={1}
                value={[loanAmount]}
                onValueChange={handleSliderChange}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span>0% MIN</span>
              <span>100% MAX</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="mx-auto flex items-center justify-center gap-x-6">
            <Button className="text-lg" onClick={handleClick} disabled={isLoading}>
              {isLoading ? 'Procesando...' : 'Solicitar préstamo'}
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Toast ref={toastRef} variant={toastVariant} className="hidden fixed bottom-4 right-4">
        {toastMessage}
      </Toast>
    </>
  )
}
