import { useState } from "react";
import { MdDelete, MdEdit, MdCheck } from "react-icons/md";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

interface Section {
  id: number;
  title: string;
}

const Sections = () => {
  const [sectionArray, setSectionArray] = useState<Section[]>([
    { id: 1, title: "Section 1" },
  ]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleRemoveSection = (id: number) => {
    const updatedSections = sectionArray
      .filter((section) => section.id !== id)
      .map((section, idx) => ({
        ...section,
        id: idx + 1, // update id to be consecutive
        // keep the title as is!
      }));
    setSectionArray(updatedSections);
    if (editId === id) setEditId(null);
  };

  const handleAddSection = () => {
    const nextId = sectionArray.length + 1;
    setSectionArray([
      ...sectionArray,
      { id: nextId, title: `Section ${nextId}` },
    ]);
  };

  const handleEditClick = (id: number, currentTitle: string) => {
    setEditId(id);
    setEditValue(currentTitle);
  };

  const handleEditSave = (id: number) => {
    setSectionArray(
      sectionArray.map((section) =>
        section.id === id ? { ...section, title: editValue } : section
      )
    );
    setEditId(null);
    setEditValue("");
  };

  return (
    <Card className="w-full h-1/3 p-4 flex flex-col gap-4 items-center">
      {sectionArray.map((section) => (
        <Card
          className="w-full p-2 flex flex-row items-center"
          key={section.id}
        >
          <CardContent className="flex-1">
            {editId === section.id ? (
              <input
                className="border border-gray-300 bg-white text-black px-2 py-1 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              section.title
            )}
          </CardContent>
          {editId === section.id ? (
            <Button
              className="ml-2"
              size="icon"
              onClick={() => handleEditSave(section.id)}
            >
              <MdCheck />
            </Button>
          ) : (
            <Button
              className="ml-2"
              size="icon"
              variant="outline"
              onClick={() => handleEditClick(section.id, section.title)}
            >
              <MdEdit />
            </Button>
          )}
          <Button
            className="ml-2"
            size="icon"
            variant="destructive"
            onClick={() => handleRemoveSection(section.id)}
          >
            <MdDelete />
          </Button>
        </Card>
      ))}
      <div>
        <Button onClick={handleAddSection}>+</Button>
      </div>
    </Card>
  );
};

export default Sections;
