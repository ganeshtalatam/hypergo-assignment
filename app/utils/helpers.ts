import { IField, IFormField } from "~/grids/AddComponentsInterface";

export function getInitialFormConfig(vairant: IField["variant"]): IFormField {
  const newFieldName = getRandomId("field");

  switch (vairant) {
    case "Input":
      return {
        variant: "Input",
        type: "",
        placeholder: "",
        name: newFieldName,
        label: "New Input",
      };
    case "Textarea":
      return {
        variant: "Textarea",
        type: "textarea",
        placeholder: "",
        name: newFieldName,
        label: "New Textarea",
      };
    case "Checkbox":
      return {
        variant: "Checkbox",
        type: "checkbox",
        name: newFieldName,
        label: "New Checkbox",
      };
    case "Select":
      return {
        variant: "Select",
        type: "select",
        name: newFieldName,
        label: "New Select",
        options: [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
        ],
      };
    case "DatePicker":
      return {
        variant: "DatePicker",
        type: "date",
        name: newFieldName,
        label: "New Date Picker",
      };
    default:
      return {
        variant: "Input",
        type: "",
        placeholder: "",
        name: newFieldName,
        label: "New Input",
      };
  }
}

export function getRandomId(prefix: string) {
  return `${prefix}_${Math.random().toString().slice(-10)}`;
}
