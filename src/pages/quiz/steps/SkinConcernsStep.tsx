import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { SkinConcern } from "@/types";

interface SkinConcernsStepProps {
  control: Control<any>;
}

export default function SkinConcernsStep({ control }: SkinConcernsStepProps) {
  const skinConcernOptions = [
    {
      value: SkinConcern.ACNE,
      label: "Acne",
      description: "Breakouts, pimples, or clogged pores",
    },
    {
      value: SkinConcern.AGING,
      label: "Signs of Aging",
      description: "Fine lines, loss of firmness, or elasticity",
    },
    {
      value: SkinConcern.DRYNESS,
      label: "Dryness",
      description: "Flakiness, tightness, or rough texture",
    },
    {
      value: SkinConcern.DULLNESS,
      label: "Dullness",
      description: "Lack of radiance or uneven skin tone",
    },
    {
      value: SkinConcern.HYPERPIGMENTATION,
      label: "Hyperpigmentation",
      description: "Dark spots, sun damage, or post-acne marks",
    },
    {
      value: SkinConcern.REDNESS,
      label: "Redness",
      description: "Flushing, rosacea, or persistent redness",
    },
    {
      value: SkinConcern.SENSITIVITY,
      label: "Sensitivity",
      description: "Easily irritated skin or reactions to products",
    },
    {
      value: SkinConcern.TEXTURE,
      label: "Texture Issues",
      description: "Rough patches, bumps, or uneven surface",
    },
    {
      value: SkinConcern.WRINKLES,
      label: "Wrinkles",
      description: "Deep lines or creases in the skin",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">What are your skin concerns?</h2>
        <p className="text-muted-foreground">
          Select all that apply to your skin.
        </p>
      </div>

      <FormField
        control={control}
        name="skinConcerns"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skinConcernOptions.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-start space-x-3 space-y-0 border rounded-md p-3"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(option.value)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), option.value]
                          : field.value?.filter(
                              (value: string) => value !== option.value,
                            ) || [];
                        field.onChange(updatedValue);
                      }}
                    />
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
            </div>
            <FormMessage className="mt-2" />
          </FormItem>
        )}
      />
    </div>
  );
}
