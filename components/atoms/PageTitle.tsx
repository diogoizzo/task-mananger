interface PageTitleProps {
   title: string;
   className?: string;
}

export default function PageTitle({ title, className }: PageTitleProps) {
   return (
      <h1 className={`mb-2 font-semibold text-3xl ${className}`}>{title}</h1>
   );
}
