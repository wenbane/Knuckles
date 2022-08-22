import React from "react";

const Placeholder = ({ text }: { text: string }) => {
  return (
    <div className="h-72 w-72 rounded-2xl border-4 border-gray-200 flex items-center justify-center">
      {text}
    </div>
  );
};

export default Placeholder;
