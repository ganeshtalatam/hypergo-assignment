import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="p-2 w-full flex justify-end items-center shadow-md">
      <Button onClick={() => navigate("/preview")}>Preview</Button>
    </div>
  );
}

export default Navbar;
