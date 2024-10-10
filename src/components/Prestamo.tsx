import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
//import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Wallet } from 'lucide-react'

export default function Component() {
    const [loanAmount, setLoanAmount] = useState(2450)
    const [toggleValue, setToggleValue] = useState("prestamo")
    const maxLoan = 2579 // 95% of 2450 / 0.95

    const handleSliderChange = (value: number[]) => {
        setLoanAmount(Math.round(value[0]))
    }

    return (
        <Card className="w-full mx-auto">
            <CardHeader className="pb-2 text-left">
                <CardTitle className="text-2xl font-bold">Credito Disponible</CardTitle>
                <CardDescription className="text-base">

                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="max-w-lg mx-auto">
                    <div className="bg-white p-3 rounded-lg mb-6">
                        <p className="text-2xl font-bold">$1,500 <span className="text-sm font-normal">XOC</span></p>
                    </div>
                    <ToggleGroup type="single" value={toggleValue} onValueChange={setToggleValue} className="justify-stretch mb-6">
                        <ToggleGroupItem value="prestamo" className="w-1/2">Prestamo</ToggleGroupItem>
                        <ToggleGroupItem value="repagar" className="w-1/2">Repagar</ToggleGroupItem>
                    </ToggleGroup>
                    <p className="text-sm text-muted-foreground mb-2">Especifique la cantidad a pedir prestado</p>
                    <div className="bg-white p-3 rounded-lg mb-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-2xl font-bold">${loanAmount} <span className="text-sm font-normal">XOC</span></p>
                                <p className="text-sm text-muted-foreground">${(loanAmount * 0.0518).toFixed(2)} USD</p>
                            </div>
                            <div className="flex items-center">
                                <Wallet className="w-4 h-4 mr-1" />
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
                <div className="flex items-center justify-center gap-x-6 mx-auto">
                    <Button className="text-lg">Firmar prestamo</Button>
                </div>
            </CardFooter>
        </Card>
    )
}