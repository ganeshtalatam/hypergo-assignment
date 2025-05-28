import { Card, CardContent } from "~/components/ui/card";

const AddComponentsInterface = () => {
  const components = [
    { id: 1, name: "Text" },
    { id: 2, name: "Text Area" },
    { id: 3, name: "Checkbox" },
    { id: 4, name: "Dropdown" },
    { id: 5, name: "Date" },
  ];
  return (
    <Card className="w-1/4 h-full p-4">
      {components.map((component) => (
        <Card
          key={component.id}
          className="w-full p-2 mb-2 flex flex-col items-center"
        >
          <CardContent className="flex flex-col items-center align-middle justify-center">
            {component.name || "New Component"}
          </CardContent>
        </Card>
      ))}
    </Card>
  );
};

export default AddComponentsInterface;
