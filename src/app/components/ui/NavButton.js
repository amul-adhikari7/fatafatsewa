const NavButton = ({ icon: Icon, label, count, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-1 p-2 hover:bg-gray-50 rounded-full transition-colors ${className}`}
      aria-label={label}>
      <Icon className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full -top-1 -right-1 bg-primary-600">
          {count}
        </span>
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
};

export default NavButton;
