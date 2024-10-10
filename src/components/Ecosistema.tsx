import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const companies = [
  {
    name: "Chipi Pay",
    image: "/placeholder.svg?height=200&width=300",
    alt: "Paga con Criptos graffiti"
  },
  {
    name: "Basenames",
    image: "/placeholder.svg?height=200&width=300",
    alt: "Basenames search interface"
  },
  {
    name: "Bando",
    image: "/placeholder.svg?height=200&width=300",
    alt: "Bando crypto transfer promotion"
  }
]

export default function Component() {
  return (
        <Card className="w-full mx-auto my-2">
        <CardHeader>
            <CardTitle className="text-2xl font-bold">Ecosistema del Talento</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {companies.map((company, index) => (
                    <div key={index} className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-2">{company.name}</h3>
                    <img 
                        src={company.image} 
                        alt={company.alt}
                        className="w-full h-48 object-cover rounded-md"
                    />
                    </div>
                ))}
                </div>

            </div>
        </CardContent>
        </Card>
  )
}