import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { IFormField } from "./AddComponentsInterface";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";
import { FaTrash, FaPlus, FaGripVertical } from "react-icons/fa";
import { useState } from "react";

function EditComponentConfig({
  formFields,
  updateFormFields,
  currentField,
  setCurrentField,
}: {
  formFields: IFormField[];
  updateFormFields: (fields: IFormField[]) => void;
  currentField: IFormField["name"] | null;
  setCurrentField: (field: IFormField["name"] | null) => void;
}) {
  const [newOption, setNewOption] = useState({ label: "", value: "" });
  const [adding, setAdding] = useState(false);

  const handleChangeProperty = (
    property: keyof IFormField,
    value: string | boolean | { label: string; value: string }[]
  ) => {
    updateFormFields(
      formFields.map((field) =>
        field.name === currentField ? { ...field, [property]: value } : field
      )
    );
  };

  const handleAddOption = () => {
    if (!newOption.label) return;
    const component = formFields.find((field) => field.name === currentField);
    if (!component) return;
    const currentOptions = component.options || [];
    handleChangeProperty("options", [...currentOptions, newOption]);
    setNewOption({ label: "", value: "" });
    setAdding(false);
  };

  const handleRemoveOption = (index: number) => {
    const component = formFields.find((field) => field.name === currentField);
    if (!component?.options) return;
    const newOptions = component.options.filter((_, i) => i !== index);
    handleChangeProperty("options", newOptions);
  };

  return (
    <Card className="p-4">
      {(() => {
        if (!currentField) return <div>Start adding components</div>;
        const component = formFields.find(
          (field) => field.name === currentField
        );
        if (!component) return <div>Component not found</div>;

        return (
          <>
            <div className="mb-4">
              <span className="font-semibold">Edit Properties</span>
              <hr className="my-4 border-gray-300" />
            </div>
            <div className="flex flex-col gap-6">
              {component.variant !== "DatePicker" && (
                <>
                  {[
                    { label: "Label", name: "label" },
                    { label: "Placeholder", name: "placeholder" },
                    { label: "Description", name: "description" },
                  ].map((property) => (
                    <div key={property.name} className="flex flex-col gap-2">
                      <Label className="text-sm font-medium">{property.label}</Label>
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
                    </div>
                  ))}
                </>
              )}

              {["Select", "Checkbox"].includes(component.variant) && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">
                      {component.variant === "Select" ? "Options" : "Columns"}
                    </Label>
                    <button
                      type="button"
                      className="rounded-full p-1 border border-input hover:bg-accent"
                      onClick={() => setAdding(true)}
                      aria-label={component.variant === "Select" ? "Add option" : "Add column"}
                    >
                      <FaPlus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {(component.options || []).map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white border rounded-md px-3 py-2 shadow-sm"
                      >
                        {component.variant === "Checkbox" && (
                          <Checkbox checked={false} disabled className="mr-3" />
                        )}
                        <span className="flex-1 text-base">{option.label}</span>
                        <button
                          type="button"
                          className="ml-2 text-gray-400 hover:text-red-500"
                          onClick={() => handleRemoveOption(index)}
                          aria-label={component.variant === "Select" ? "Delete option" : "Delete column"}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                  {adding && (
                    <div className="flex items-center gap-2 mt-2 bg-gray-50 border rounded-md px-3 py-2">
                      <Input
                        className="flex-1"
                        placeholder={component.variant === "Select" ? "Option label" : "Column label"}
                        value={newOption.label}
                        onChange={(e) =>
                          setNewOption((prev) => ({ ...prev, label: e.target.value }))
                        }
                        autoFocus
                      />
                      <Button
                        size="sm"
                        onClick={handleAddOption}
                        disabled={!newOption.label}
                        variant="default"
                      >
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setAdding(false);
                          setNewOption({ label: "", value: "" });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {component.variant === "DatePicker" && (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">Label</Label>
                    <Input
                      className="w-full"
                      placeholder="Question"
                      value={component.label ?? ""}
                      onChange={e => handleChangeProperty("label", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">Placeholder</Label>
                    <Input
                      className="w-full"
                      placeholder="Month, day, year"
                      value={component.placeholder ?? ""}
                      onChange={e => handleChangeProperty("placeholder", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">Description</Label>
                    <Input
                      className="w-full"
                      placeholder="Description"
                      value={component.description ?? ""}
                      onChange={e => handleChangeProperty("description", e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 border-2 border-input w-fit p-2 rounded-md mt-2">
                    <Checkbox
                      checked={component.required ?? false}
                      onCheckedChange={checked =>
                        handleChangeProperty("required", checked as boolean)
                      }
                    />
                    <Label className="cursor-pointer">Required</Label>
                  </div>
                </div>
              )}
            </div>

            <Button
              className="w-full mt-7"
              variant="destructive"
              onClick={() => {
                const idx = formFields.findIndex((field) => field.name === currentField);
                const newFields = formFields.filter((field) => field.name !== currentField);
                updateFormFields(newFields);
                if (newFields.length > 0) {
                  const newIdx = idx > 0 ? idx - 1 : 0;
                  setCurrentField(newFields[newIdx].name);
                } else {
                  setCurrentField(null);
                }
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
