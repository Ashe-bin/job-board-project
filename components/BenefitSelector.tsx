import { benefits } from "@/app/utils/listofBenefits";
import { Badge } from "./ui/badge";
import { ControllerRenderProps } from "react-hook-form";

interface BenefitSelectorProps {
  field: ControllerRenderProps;
}

const BenefitSelector = ({ field }: BenefitSelectorProps) => {
  function toggleBenefit(benefitId: string) {
    const currentBenefits = field.value || [];

    const newBenefits = currentBenefits.includes(benefitId)
      ? currentBenefits.filter((id: string) => id !== benefitId)
      : [...currentBenefits, benefitId];

    console.log("newbenefit", newBenefits);

    field.onChange(newBenefits);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-x-2 gap-y-4 items-center justify-center">
        {benefits.map((benefit) => {
          const isSelected = (field.value || []).includes(benefit.id);
          return (
            <Badge
              key={benefit.id}
              variant={isSelected ? "secondary" : "outline"}
              className="cursor-pointer transition-all hover:scale-105 active:scale-95 text-sm px-3 py-1 rounded-full tracking-wide font-normal border border-primary/30 duration-300"
              onClick={() => toggleBenefit(benefit.id)}
            >
              <span className="flex items-center gap-2">
                {benefit.icon}
                {benefit.label}
              </span>
            </Badge>
          );
        })}
      </div>
      <div className="mt-4 text-sm text-muted-foreground border border-primary/50 inline-flex px-4 py-2 rounded-lg bg-primary/5 font-semibold gap-3 justify-center items-center tracking-wider ">
        <span className="text-muted-foreground">Selected Benefits : </span>

        <span className="text-primary"> {(field.value || []).length}</span>
      </div>
    </div>
  );
};

export default BenefitSelector;
