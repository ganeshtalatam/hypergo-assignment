import {
  MdTextFields,
  MdTextSnippet,
  MdCheckBox,
  MdArrowDropDown,
  MdDateRange,
} from "react-icons/md";
// import { Card, CardContent } from "~/components/ui/card";

export interface IField {
  label: string;
  variant: "Input" | "Textarea" | "Checkbox" | "Select" | "DatePicker";
}

export interface IFormField {
  variant: IField["variant"];
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

export interface ISection {
  id: string;
  label: string;
  fields: IFormField[];
}

const initialComponents: (IField & { icon: React.ReactNode })[] = [
  { label: "Input", variant: "Input", icon: <MdTextFields size={20} /> },
  {
    label: "Text Area",
    variant: "Textarea",
    icon: <MdTextSnippet size={20} />,
  },
  { label: "Checkbox", variant: "Checkbox", icon: <MdCheckBox size={20} /> },
  { label: "Dropdown", variant: "Select", icon: <MdArrowDropDown size={20} /> },
  { label: "Date", variant: "DatePicker", icon: <MdDateRange size={20} /> },
];

const AddComponentsInterface = () => {
  // Drag event handlers
  const handleDragStart = (e: React.DragEvent, field: IField) => {
    e.dataTransfer.setData("variant", field.variant);
    e.currentTarget.classList.add("opacity-50");
  };
  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("opacity-50");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-2 w-full max-w-xs border">
      <div className="mb-2 font-semibold text-base px-2 pt-2">
        Form Components
      </div>
      <ul className="flex flex-col gap-1">
        {initialComponents.map((component) => (
          <li
            key={component.variant}
            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-move transition-colors hover:bg-gray-100 active:bg-gray-200 select-none"
            draggable
            onDragStart={(e) => handleDragStart(e, component)}
            onDragEnd={handleDragEnd}
          >
            <span className="text-primary">{component.icon}</span>
            <span className="text-[15px] font-medium">{component.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddComponentsInterface;
