import { IField, IFormField } from "~/grids/AddComponentsInterface";

export function getInitialFormConfig(vairant: IField["variant"]): IFormField {
  const newFieldName = `field_${Math.random().toString().slice(-10)}`;

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
