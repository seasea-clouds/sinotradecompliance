export default function BlogCategoryFilter({
  categories,
  currentCategory,
  onCategoryChange,
}: {
  categories: string[];
  currentCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
          !currentCategory
            ? 'bg-[#D4AF37] text-white'
            : 'bg-[#F4F6F9] text-[#333333] hover:bg-primary-navy/10'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            currentCategory === cat
              ? 'bg-[#D4AF37] text-white'
              : 'bg-[#F4F6F9] text-[#333333] hover:bg-primary-navy/10'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
