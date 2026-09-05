const TableHeader = ({
  children,
}) => {
  return (
    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-gray-400">
      {children}
    </th>
  );
};

export default TableHeader;