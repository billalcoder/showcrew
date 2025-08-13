export  function BrandHeading({ title }) {
  return (
    <div className="flex items-center justify-center my-6">
      <div className="flex-grow border-t border-gray-300"></div>
      <h2 className="mx-4 text-lg md:text-xl font-bold tracking-wide">
        {title}
      </h2>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}