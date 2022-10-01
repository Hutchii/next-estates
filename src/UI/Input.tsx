import Dollar from "../../public/svg/dollar.svg";
import { Form } from "../pages";
import { NumericFormat } from "react-number-format";

const Input = ({
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
      <NumericFormat
        prefix="$ "
        className="placehoder:text-grey block w-full truncate text-sm font-medium text-purple-dark outline-none placeholder:font-normal"
        value={value}
        thousandSeparator=","
        placeholder={placeholder}
        onValueChange={(values) =>
          setForm((p) => ({ ...p, [name]: values.formattedValue }))
        }
      />
    </div>
  );
};

export default Input;
