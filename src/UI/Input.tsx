import Dollar from "../../public/svg/dollar.svg";
import { Form } from "../pages";
import { NumberFormatBase } from "react-number-format";

const Currency = (props: any) => {
  const format = (numStr: any) => {
    if (numStr === "") return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(numStr);
  };

  return <NumberFormatBase {...props} format={format} />;
};

const InputCurrency = ({
  name,
  placeholder,
  value,
  setForm,
}: {
  name: string;
  placeholder: string;
  value: string;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
}) => {
  return (
    <div className="flex items-center gap-2.5 border-b border-grey/20 pb-4">
      <Dollar />
      <Currency
        className="placehoder:text-grey block w-full truncate text-sm font-medium text-purple-dark outline-none placeholder:font-normal"
        value={value}
        placeholder={placeholder}
        onValueChange={(values: {
          floatValue: number;
          formattedValue: string;
          value: string;
        }) => setForm((p) => ({ ...p, [name]: values.formattedValue }))}
      />
    </div>
  );
};

export default InputCurrency;
