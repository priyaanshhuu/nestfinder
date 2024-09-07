import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel({labell,type,placeholder}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="labell">{labell}</Label>
      <Input type={type} id={type} placeholder={placeholder} />
    </div>
  )
}
