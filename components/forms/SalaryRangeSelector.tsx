import { Control, useController } from "react-hook-form";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { Input } from "../ui/input";

interface SalaryRangeSelectorProps {
  control: Control<any>;
  minSalary: number;
  maxSalary: number;
  step: number;
  currency: string;
}

export const SalaryRangeSelector = ({
  control,
  minSalary,
  maxSalary,
  step,
}: SalaryRangeSelectorProps) => {
  const { field: fromField } = useController({ name: "salaryFrom", control });
  const { field: toField } = useController({ name: "salaryTo", control });

  const [range, setRange] = useState<[number, number]>([
    fromField.value || minSalary,
    toField.value || maxSalary / 2,
  ]);

  function handleChangeRange(value: number[]) {
    const newRange: [number, number] = [value[0], value[1]];
    setRange(() => {
      console.log("Updated range:", newRange);
      fromField.onChange(newRange[0]);
      toField.onChange(newRange[1]);
      return newRange;
    });
  }
  function handleChangeFromInput(value1: number, value2: number) {
    const newRange: [number, number] = [value1, value2];
    setRange(newRange);
    fromField.onChange(value1);
    toField.onChange(value2);
  }

  return (
    <div className="w-full space-y-4 flex-col">
      <Slider
        onValueChange={handleChangeRange}
        min={minSalary}
        max={maxSalary}
        step={step}
        value={range}
      />
      <div className="flex justify-between items-center">
        <span>{formatCurrency(range[0])}</span>
        <span>{formatCurrency(range[1])}</span>
      </div>
      <div className="flex items-center gap-3 justify-between ">
        <Input
          type="number"
          className="rounded-lg w-32
           no-spinner border  p-1 focus:outline-none"
          value={range[0]}
          onChange={(e) => {
            handleChangeFromInput(Number(e.target.value), range[1]);
          }}
          min={0}
          max={range[1]}
        />
        <Input
          type="number"
          className="no-spinner rounded-lg w-32 bg-transparent border p-1 focus:outline-none"
          value={range[1]}
          min={range[0]}
          max={1000000}
          onChange={(e) => {
            handleChangeFromInput(range[0], Number(e.target.value)); // Handle value change
          }}
        />
      </div>
    </div>
  );
};
