const DrawerSection = ({
  title,
  children,
}) => {
  return (
    <section className="mb-7">
      <h3 className="mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
        {title}
      </h3>

      {children}
    </section>
  );
};

export default DrawerSection;