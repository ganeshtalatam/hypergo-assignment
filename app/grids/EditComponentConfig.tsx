import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { IFormField } from "./AddComponentsInterface";
import { Checkbox } from "~/components/ui/checkbox";

function EditComponentConfig({
  formFields,
  setFormFields,
  selectedComponent,
}: {
  formFields: IFormField[];
  setFormFields: React.Dispatch<React.SetStateAction<IFormField[]>>;
  selectedComponent: IFormField["name"] | null;
}) {
  const handleChangeProperty = (
    property: keyof IFormField,
    value: string | boolean
  ) => {
    setFormFields(
      formFields.map((field) =>
        field.name === selectedComponent
          ? { ...field, [property]: value }
          : field
      )
    );
  };

  return (
    <Card className="p-4 w-1/5">
      {(() => {
        if (!selectedComponent) return <div>Start adding components</div>;
        const component = formFields.find(
          (field) => field.name === selectedComponent
        );
        if (!component) return <div>Component not found</div>;

        return (
          <>
            <span>Edit {component.name}</span>
            <hr className="my-4 border-gray-300" />
            <div className="flex flex-col gap-6">
              <Label className="flex flex-col items-start gap-2">
                <span>Label</span>
                <Input
                  className="w-full"
                  value={component.label}
                  onChange={(e) =>
                    handleChangeProperty("label", e.target.value)
                  }
                />
              </Label>
              <Label className="flex flex-col items-start gap-2">
                <span>Description</span>
                <Input
                  className="w-full"
                  value={component.description}
                  onChange={(e) =>
                    handleChangeProperty("description", e.target.value)
                  }
                />
              </Label>
              <Label className="flex flex-col items-start gap-2">
                <span>Placeholder</span>
                <Input
                  className="w-full"
                  value={component.placeholder}
                  onChange={(e) =>
                    handleChangeProperty("placeholder", e.target.value)
                  }
                />
              </Label>
              <Label className="flex flex-row items-center gap-2 border-2 border-input w-fit p-2 rounded-md">
                <Checkbox
                  checked={component.required}
                  onCheckedChange={(checked) =>
                    handleChangeProperty("required", checked as boolean)
                  }
                />
                <span>Required</span>
              </Label>
            </div>
          </>
        );
      })()}
    </Card>
  );
}

export default EditComponentConfig;
