import { Button } from "~/components/ui/button";

function Navbar({ handlePreview }: { handlePreview: () => void }) {
  return (
    <div className="p-2 w-full flex justify-end items-center shadow-md">
      <Button onClick={handlePreview}>Preview</Button>
    </div>
  );
}

export default Navbar;
