const SidebarSkeleton = () => {
  return (
    <div className="space-y-6">
{Array.from({ length: 7 }).map((_, i) => (
  <div key={i} className="flex items-center gap-x-3">
    <div className="size-12 skeleton rounded-full shadow relative" />
    <div className="flex flex-col gap-y-2">
      <p className="h-4 w-24 skeleton"/>
      <span className="skeleton w-16 h-3"/>
    </div>
  </div>
))}
    </div>
  );
};

export default SidebarSkeleton;
