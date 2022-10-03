import Dollar from "../../public/svg/dollar.svg";
import type { FiltersForm } from "../pages";
import { NumberFormatBase } from "react-number-format";

const Currency = (props: any) => {
  const format = (numStr: string) => {
    console.log(numStr);
    if (numStr === "") return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(+numStr);
  };
  return <NumberFormatBase {...props} format={format} />;
};

const InputCurrency = ({
  name,
  placeholder,
  value,
  onChange,
}: {
  name: string;
  placeholder: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<FiltersForm>>;
}) => {
  return (
    <>
      <span>
        <Dollar />
      </span>
      <Currency
        className="placehoder:text-grey block w-full truncate text-sm font-medium text-purple-dark outline-none placeholder:font-normal"
        value={value}
        placeholder={placeholder}
        onValueChange={(values: {
          floatValue: number;
          formattedValue: string;
          value: string;
        }) =>
          onChange((prevValues) => ({
            ...prevValues,
            [name]: values.formattedValue,
          }))
        }
      />
    </>
  );
};

export default InputCurrency;
