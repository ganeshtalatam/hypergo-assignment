import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import * as SelectPrimitive from "@radix-ui/react-select";

interface IBaseSelect
  extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  options: { label: string; value: string }[];
  placeholder?: string;
}

function BaseSelect(props: IBaseSelect) {
  const { options, placeholder, ...rest } = props;

  return (
    <Select data-slot="select">
      <SelectTrigger {...rest}>
        <SelectValue placeholder={placeholder} />
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectTrigger>
    </Select>
  );
}

export default BaseSelect;
