interface MenuTitle {
   text: string;
}

export default function MenuTitle({ text }: MenuTitle) {
   return (
      <h3 className="mb-2 text-xs uppercase text-gray-500 font-medium">
         {text}
      </h3>
   );
}
