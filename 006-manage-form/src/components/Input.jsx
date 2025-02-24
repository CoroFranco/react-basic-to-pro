import useValidateForm from "../hooks/useValidateForm";


export default function Input({ name, children }) {
  const { values, errors, handleChange, handleBlur } = useValidateForm();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label htmlFor={name}>{children}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={values[name] || ""}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors[name] && <p style={{ color: "red", margin: 0 }}>{errors[name]}</p>}
    </div>
  );
}
