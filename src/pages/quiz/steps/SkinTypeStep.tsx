import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SkinType } from "@/types";

interface SkinTypeStepProps {
  control: Control<any>;
}

export default function SkinTypeStep({ control }: SkinTypeStepProps) {
  const skinTypeOptions = [
    {
      value: SkinType.DRY,
      label: "Dry",
      description: "Feels tight, may have flaky patches, rarely gets oily",
    },
    {
      value: SkinType.OILY,
      label: "Oily",
      description: "Shiny appearance, enlarged pores, prone to breakouts",
    },
    {
      value: SkinType.COMBINATION,
      label: "Combination",
      description:
        "Oily T-zone (forehead, nose, chin) with normal or dry cheeks",
    },
    {
      value: SkinType.NORMAL,
      label: "Normal",
      description: "Balanced, not too oily or dry, few imperfections",
    },
    {
      value: SkinType.SENSITIVE,
      label: "Sensitive",
      description:
        "Easily irritated, may become red, itchy, or burn with products",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">What's your skin type?</h2>
        <p className="text-muted-foreground">
          Select the option that best describes your skin most of the time.
        </p>
      </div>

      <FormField
        control={control}
        name="skinType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-3"
              >
                {skinTypeOptions.map((option) => (
                  <FormItem
                    key={option.value}
                    className="flex items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="font-medium">
                        {option.label}
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
