import { useState } from "react";
import { Card } from "~/components/ui/card";

const FormBuilderCanvas = () => {
  const [droppedComponents, setDroppedComponents] = useState<
    { id: number; name: string }[]
  >([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("component");
    if (data) {
      const component = JSON.parse(data);
      setDroppedComponents((prev) => [...prev, component]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Card
      className="flex-1 min-h-[300px] p-4 border-2 border-dashed border-gray-300"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {droppedComponents.length === 0 ? (
        <div className="text-gray-400 text-center">Drop components here</div>
      ) : (
        droppedComponents.map((comp, idx) => (
          <div key={idx} className="mb-2 p-2 border rounded bg-gray-50">
            {comp.name}
          </div>
        ))
      )}
    </Card>
  );
};

export default FormBuilderCanvas;
