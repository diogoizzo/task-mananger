export default function Loading() {
   return (
      <div className="w-full h-[100vh] bg-indigo-100 flex justify-center items-center">
         <img
            className={'h-44 text-indigo-500 animate-spin-slow '}
            alt="Loading Spinner"
            src="/img/spin.svg"
         ></img>
      </div>
   );
}
