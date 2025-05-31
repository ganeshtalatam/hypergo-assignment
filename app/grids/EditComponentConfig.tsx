import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { IFormField } from "./AddComponentsInterface";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";

function EditComponentConfig({
  formFields,
  updateFormFields,
  selectedComponent,
}: {
  formFields: IFormField[];
  updateFormFields: (fields: IFormField[]) => void;
  selectedComponent: IFormField["name"] | null;
}) {
  const handleChangeProperty = (
    property: keyof IFormField,
    value: string | boolean
  ) => {
    updateFormFields(
      formFields.map((field) =>
        field.name === selectedComponent
          ? { ...field, [property]: value }
          : field
      )
    );
  };

  return (
    <Card className="p-4">
      {(() => {
        if (!selectedComponent) return <div>Start adding components</div>;
        const component = formFields.find(
          (field) => field.name === selectedComponent
        );
        if (!component) return <div>Component not found</div>;

        return (
          <>
            <span className="font-semibold">Edit {component.name}</span>
            <hr className="my-4 border-gray-300" />
            <div className="flex flex-col gap-6">
              {[
                {
                  label: "Label",
                  name: "label",
                },
                {
                  label: "Placeholder",
                  name: "placeholder",
                },
                {
                  label: "Description",
                  name: "description",
                },
              ].map((property) => (
                <Label
                  key={property.name}
                  className="flex flex-col items-start gap-2"
                >
                  <span>{property.label}</span>
                  <Input
                    className="w-full"
                    value={
                      (component[
                        property.name as keyof IFormField
                      ] as string) ?? ""
                    }
                    onChange={(e) =>
                      handleChangeProperty(
                        property.name as keyof IFormField,
                        e.target.value
                      )
                    }
                  />
                </Label>
              ))}
              <Label className="flex flex-row items-center gap-2 border-2 border-input w-fit p-2 rounded-md">
                <Checkbox
                  checked={component.required ?? false}
                  onCheckedChange={(checked) =>
                    handleChangeProperty("required", checked as boolean)
                  }
                />
                <span>Required</span>
              </Label>
            </div>

            <Button
              className="w-full mt-7"
              variant="destructive"
              onClick={() => {
                updateFormFields(
                  formFields.filter((field) => field.name !== selectedComponent)
                );
              }}
            >
              Delete
            </Button>
          </>
        );
      })()}
    </Card>
  );
}

export default EditComponentConfig;
