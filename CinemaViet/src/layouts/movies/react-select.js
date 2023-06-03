import React from "react";
import Select from "react-select";

export default function ReactSelect(props) {
  const { options, defaultValue, handleOnChange } = props;

  return (
    <Select
      className="border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full "
      isMulti
      name="category"
      defaultValue={defaultValue}
      options={options}
      classNamePrefix="select"
      onChange={handleOnChange}
    />
  );
}
