import { useThemeStore } from "../../Store/UseThemeStore";
import { THEMES } from "../../utils/Themes";

const ThemesSetting = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div>
      <div className="space-y-3">
        <h1 className=" font-bold text-2xl text-primary">Theme</h1>
        <p className="text-primary/50 text-sm ">Pick Your Favorite Theme </p>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 my-8 gap-5 relative">
        {THEMES.map((th, index) => (
          <div
            key={index}
            className={`text-center p-2 cursor-pointer relative rounded-lg transition-colors duration-150 ${
              th == theme ? "bg-base-200" : "hover:bg-base-300/50"
            }`}
            onClick={() => setTheme(th)}
          >
            <div
              className="flex items-center gap-x-1 relative p-1 rounded-md "
              data-theme={th}
            >
              <div className="bg-primary h-8 w-full rounded" />
              <div className="bg-secondary h-8 w-full rounded" />
              <div className="bg-accent h-8 w-full rounded" />
              <div className="bg-neutral h-8 w-full rounded" />
            </div>
            <p className="text-sm text-primary capitalize">{th}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemesSetting;
