import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

const InfoCard = ({ title, content, icon }: { title: string; content: string | number; icon?: React.ReactNode }) => (
  <div className="bg-white rounded-lg p-4 mb-4">
    <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
    <div className="flex justify-between items-center">
      <p className="text-xl font-semibold">{content}</p>
      {icon}
    </div>
  </div>
)

export default function Component() {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Synopsis del Credito</CardTitle>
      </CardHeader>
      <CardContent>
          <div className="max-w-lg mx-auto">
          <InfoCard title="Balance Actual" content={<>$1,000 <span className="text-sm font-normal ">XOC</span></>} />
            <InfoCard title="Interes Variable" content="7.8%" />
            <InfoCard 
            title="Status del Credito" 
            content={<span className="text-orange-500">Pendiente</span>} 
            icon={<AlertCircle className="h-5 w-5 text-orange-500" />}
            />
            <div className="bg-secondary rounded-lg p-4 mb-4 h-16 bg-white"></div>

          </div>

      </CardContent>
    </Card>
  )
}