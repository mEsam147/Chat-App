import Preview from "../components/setting/Preview";
import ThemesSetting from "../components/setting/ThemesSetting";

const Setting = () => {
  return (
    <div className="max-w-6xl mx-auto py-5">
      <ThemesSetting />
      <Preview />
    </div>
  );
};

export default Setting;
